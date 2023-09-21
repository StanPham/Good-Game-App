<template>
    <div class="form-container" id="formContainer">
        <img :src="nami" alt="" class="nami">
        <form>
            <div class="form-header">
                <h2>Register</h2>
                <img :src="x" alt="" class="x-icon" @click="$emit('closeThis')">
            </div>
            <p>Create an account for some reason</p>
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
    display: flex;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    height:400px;
    width:400px;
    background-color: aquamarine;
    justify-content: flex-end;
   
    border-radius: 10px;

}


form{
    height:100%;
    display:flex;
    flex-direction: column;
    padding: 20px;
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
    height: 30px;
    margin-bottom: 10px;
    padding-left:20px;
}

input:focus{
    outline:none;
}

.submit-btn{
   
    background-color: rgb(0, 0, 0);
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
.swap-login{
    color:blue;
    text-decoration: underline;
    cursor: pointer;
    
}
.x-icon:hover{
    transform: scale(1.1);
    cursor: pointer;
}

</style>

<script>

import nami from './nami.png';
import x from './x.svg';
export default{
    
    name: 'TheSignup',
    data() {
    return {
      nami: nami,
      x:x,
      
     
    };
  },

  
  
  

  
 
}
  
</script>