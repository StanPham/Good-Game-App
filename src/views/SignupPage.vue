<template>
    <div class="form-container" id="formContainer">
        
        <form>
            <div class="form-header">
                <h2>Register</h2>
                
            </div>
            
            <div>
                <label for = "email"></label>
                <input type = "email" id="email" placeholder="Email">
            </div>
            <div>
                <label for = "username"></label>
                <input type = "text" id="username" placeholder="Username">
            </div>
            <div>
                <label for = "password"></label>
                <input type = "password" id="password" placeholder="Password">
            </div>
            <div>
                <label for = "passwordC"></label>
                <input type = "password" id="passwordC" placeholder="Confirm password">
            </div>
            
            <button type="submit" class="submit-btn">Submit</button>
            <button  type="button" class="swap-login" @click="$emit('someEvent')" >Have an account? Login.</button>
        </form>
    
</div>
    
</template>

<style scoped>
.form-container{
   
    margin-inline: auto;
    width: clamp(200px, 90vw,50rem);
   
    
    
    background-color: rgb(66, 60, 63);
   
   
    border-radius: 10px;
    color:white;

}


form{
    width:100%;
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


</style>

