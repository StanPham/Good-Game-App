<template>
    <div class="form-container" id="formContainer">
        
        <form>
            <div class="form-header">
                <h2>Login</h2>
                
            </div>
            
            <div>
                <label for = "email"></label>
                <input type = "email" id="email" placeholder="Email">
            </div>
            
            <div>
                <label for = "password"></label>
                <input type = "password" id="password" placeholder="Password">
            </div>
            
            
            <button type="submit" class="submit-btn">Submit</button>
            <button  type="button" class="swap-login" @click="$emit('someEvent')" >No account? Signup.</button>
        </form>
        <div class="pika-contain">
            <img src="../components/pikachu.webp" alt="" class="pika">
        </div>  
</div>
    
</template>

<style scoped>

.pika{
    max-width: 50%;
    display: block;
    margin-left: auto;
    margin-right: auto;
   
}
.form-container{
   
    margin-inline: auto;
    width: clamp(200px, 90vw,50rem);
   
    display:flex;
    
    background-color: rgb(66, 60, 63);
   
   
    border-radius: 10px;
    color:white;

}
h2{
    margin-bottom:1.3rem;
}

form{
    width:clamp(23rem,50%,5000px);
    display:flex;
    flex-direction: column;
    padding: 1.25em;
    gap:10px;
    
    
}

.form-header{
    display:flex;
    justify-content: space-between;
}

input{
    border-radius: 5px;
    border: 1px solid rgb(24, 23, 22);
    width:100%;
    height: 2rem;
    margin-bottom: 10px;
    padding-left:1.25rem;
    background-color: rgb(53, 55, 56);
    color:white;
}

input:focus{
    outline:none;
    
}

.submit-btn{
   
    background-color: rgb(168, 41, 168);
    font-size: 20px;
    border-radius: 10px;
    padding:5px;
    border:none;
    color:white;
}
.submit-btn:hover{
    cursor:pointer;
    background-color: rgb(32, 32, 32);
    transform: scale(1.01);
}

@media(max-width: 750px){
    .pika-contain{
        display:none;
    }
}


</style>

