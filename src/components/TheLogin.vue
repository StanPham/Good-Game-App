<template>
    <div class="form-container" id="formContainer">
        <img :src="nami" alt="" class="nami">
        <form>
            <h2>Login</h2>
            <p>Login to our site for some reason</p>
            <div>
                <label for = "email"></label>
                <input type = "email" id="email" placeholder="Email">
            </div>

            <div>
                <label for = "password"></label>
                <input type = "password" id="password" placeholder="Password">
            </div>
            
            
            <button type="submit" class="submit-btn">Submit</button>
            <button  type="button" class="swap-signup" @click="$emit('otherEvent')" >Need an account? Signup.</button>
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

.swap-signup{
    color:blue;
    text-decoration: underline;
    cursor: pointer;
}
</style>

<script>

import nami from './nami.png';
export default{
    
    name: 'TheLogin',
    data() {
    return {
      nami: nami,
     
      
      
    };
  },
  
  

  
 
}
  
</script>