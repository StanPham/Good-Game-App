
<template>
    <div class="container">
        <div class="card-picture">
             <img src="../components/swords.png" alt="" class="some-picture"> 
        </div>
        <div class="event-wrapper">
            
           
                <h1 class="event-day">SHOP</h1>
              
                
                <h2 class="event-title">Check out our wide variety of available products! </h2>
                  
                <br>
                <button class="allEvents" >SHOP NOW</button>
                <br> <br> <br>
        </div>

    </div>

</template>        
                
<style scoped>
.card-picture{
    
 

}
.some-picture{
   
    height:100%;
    padding:1rem;
}

.event-wrapper{
    padding-top: 1rem;
    font-size: clamp(1.3vw,1rem, 10vw);
    text-align: center;
    
   
    
}



.container{
   
 
  position:relative;
   
   border-radius: 1rem;
   width: clamp(1px,100vw,26rem);
   
   
    
  }

  .container::before{
    content: ""; 
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  
     background-image: url('../components/knight.png'); 
     background-size: cover;
     background-repeat: no-repeat;
     opacity: 75%;
     filter:brightness(50%);
     
    
   
   z-index:-1;
  }
    
.event-title{
    /* padding-left:1rem; */
    font-weight:bold;
    font-style: italic;
    
    padding-top:1rem;
   
}
.event-description{
    padding-top: 5px;
}
.allEvents:hover{
  color:#bb76ffa1;
  background-color: white;
  border-color: #bb76ffa1;
}
.allEvents{
  color:rgb(59, 51, 5);
  background: #ffffff;
 border: rgb(59, 51, 5) 3px solid;
font-size:1.1rem;
font-weight:bold;

padding:.8rem 2rem;

}

</style>










