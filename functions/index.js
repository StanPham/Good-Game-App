
const {initializeApp} = require("firebase-admin/app");
initializeApp();

const {getFirestore, Timestamp, Firestore } = require("firebase-admin/firestore");
const functions = require("firebase-functions");
const {onCall} = require("firebase-functions/v2/https");
const {setGlobalOptions} = require("firebase-functions/v2")
const {getAuth} = require("firebase-admin/auth")
const cors = require('cors')({ origin: true });
setGlobalOptions({maxInstances: 10})

exports.addadminrole = onCall((request) =>  {
    return new Promise((resolve, reject) => {
        if(request.auth.token.admin){
            getAuth().getUserByEmail(request.data.userEmail).then(user => {
                getAuth().setCustomUserClaims(user.uid, {
                    admin: true
                }).then(() => {
                    resolve({
                        message: `Sucessfully made ${request.data.userEmail} an admin`
                    })
                }).catch(err => {
                    reject(err)
                })
            }).catch(err => {
                resolve({
                    message: "User Not Found"
                })
            })
        } else {
            resolve({
                message: "You are not logged in as an admin."
            })
        }
    })
})

exports.addreservation = onCall((request) => {
    return new Promise(async (resolve,reject) => {
        let productRef;
        let productNumLeft;
        
        console.log(request.auth.token.email)

        //base protections
        if(!request.auth.token.email_verified){
            resolve({
                state: "error",
                message: "unverified-email"
            })
            return;
        }
        if(!request.auth.token.phone_number){
            resolve({
                state: "error",
                message: "unverified-phone"
            })
        }
        //check that quantity is 3 or less
        if(request.data.quantity >= 3 || parseInt(request.data.quantity) == NaN){
            console.log("quantity error")
            resolve({
                state: "error",
                message: "large-quantity"
            })
            return;
        }
        //check product exists
        let productDoc = getFirestore().collection('shop').doc(request.data.productID);
        await productDoc.get().then((doc) => {
            if(!doc.exists) {
                console.log("product not found error")
                resolve({
                    state: "error",
                    message: "product-not-found"
                })
                return;
            } else if(doc.data().numLeft < request.data.quantity){
                console.log("not enough quantity left")
                resolve({
                    state: "error",
                    message: "low-quantity"
                })
                return;
            } else {
                productRef = doc.data().name
                productNumLeft = doc.data().numLeft
            }
        })
        //check if document exists in shopReservation collection
        let db = getFirestore()
        let collectionRef = db.collection('shopReservation')
        await collectionRef.doc(request.auth.uid).get().then((doc) => {
            if (doc.exists) {
                //check that more than 2 reservations dont exist
                if(doc.data().reservations.length >= 2) {
                    console.log("too many reservations error")
                    resolve({
                        state:"error",
                        message: "too-many-reservations"
                    })
                    return;
                }
                //check that product isn't already reserved, would need to be loop if max reservation number > 2
                if(doc.data().reservations[0].productID == request.data.productID){
                    resolve({
                        state:"error",
                        message: "product-already-reserved"
                    })
                    return;
                }
                //update doc
                doc.ref.update({
                    reservations: Firestore.FieldValue.arrayUnion({
                        creationDate: Timestamp.fromDate(new Date()),
                        productID: request.data.productID,
                        quantity: parseInt(request.data.quantity),
                        productName : productRef,
                        email: request.auth.token.email
                    })
                }).then(() =>{
                    productDoc.update({
                        numLeft: productNumLeft - request.data.quantity
                    })
                    resolve({
                        state: "pass",
                        message: "reservation-success"
                    }).catch((err) => {
                        console.log(err)
                        resolve({
                            state: "error",
                            message:"internal-error"
                        })
                    })
                })
            } else {
                //create new document
                doc.ref.set({
                    reservations: [{
                        creationDate: Timestamp.fromDate(new Date()),
                        productID: request.data.productID,
                        quantity: parseInt(request.data.quantity),
                        productName : productRef,
                        email: request.auth.token.email
                    }]
                }).then(() => {
                    productDoc.update({
                        numLeft: productNumLeft - request.data.quantity
                    })
                    console.log(`Document successfully created with ${request.auth.uid}`)
                    resolve({
                        state: "pass",
                        message: "reservation-success"
                    }).catch((err) =>{
                        console.log(err)
                        resolve({
                            state: "error",
                            message: "internal-error"
                        })
                    })
                })
            }
        })
    })
})

exports.deletereservation = onCall((request) => {
    return new Promise(async (resolve, reject) => {
        //info needed:
        //index of reservation to delete
        //id of document if admin
        //state: accept or delete

        //check state format
        if(!(request.data.state == "accept" || request.data.state == "delete")){
            resolve({
                state: "error",
                message: "invalid-state-input"
            })
            return;
        }
        //check perms
        if(!(request.auth.uid == request.data.uid) || request.data.state == "accept") {
            if(!request.auth.token.admin){
                resolve({
                    state: "error",
                    message: "insufficient-permissions"
                })
                return;
            }
        }
        
        let db = getFirestore()
        let collectionRef = db.collection('shopReservation')
        let reservationRef = collectionRef.doc(request.data.uid)
        await reservationRef.get().then((doc) => {
            if(!doc.exists){
                resolve({
                    state:"error",
                    message:"doc-not-found"
                })
                return;
            }
            //check if index is in valid range
            if(request.data.index >= doc.data().reservations.length || request.data.index < 0) {
                resolve({
                    state: "error",
                    message: "index-out-of-range"
                })
                return;
            }

            //update shop table
            let productDoc = getFirestore().collection('shop').doc(doc.data().reservations[request.data.index].productID);
            productDoc.get().then((productDocRef) => {
                if(!doc.exists) {
                    console.log("product not found error")
                    resolve({
                        state: "error",
                        message: "product-not-found"
                    })
                    return;
                }
                if(request.data.state == "delete"){
                    productDoc.update({
                        numLeft: productDocRef.data().numLeft + doc.data().reservations[request.data.index].quantity
                    })
                } else if(request.data.state == "accept"){
                    productDoc.update({
                        quant: productDocRef.data().quant - doc.data().reservations[request.data.index].quantity
                    })
                }
                let reservationArr = doc.data().reservations
                if (reservationArr.length == 1){
                    doc.ref.delete()
                    resolve({
                        state: "pass",
                        message: "reservation-deleted"
                    })
                } else {
                    reservationArr.splice(request.data.index, 1)
                    doc.ref.update({
                        reservations : reservationArr
                    }).then(() => { 
                        resolve({
                            state: "pass",
                            message: "reservation-deleted"
                        })
                        return;
                    }).catch((err) => {
                        console.log(err)
                        resolve({
                            state: "error",
                            message: "internal-error"
                        })
                        return;
                    })
                }
            })
        })
    })
})