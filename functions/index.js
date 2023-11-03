
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
        console.log("productID:")
        console.log(request.data.productID)
        console.log("Quantity:")
        console.log(request.data.quantity)
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
        let shopItemRef = getFirestore().collection('shop').doc(request.data.productID).get().then((doc) => {
            if(!doc.exists) {
                console.log("product not found error")
                resolve({
                    state: "error",
                    message: "product-not-found"
                })
                return;
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
                //check that product isn't already reserved
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
                        quantity: parseInt(request.data.quantity)
                    })
                }).then(() =>{
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
                        quantity: request.data.quantity
                    }]
                }).then(() => {
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