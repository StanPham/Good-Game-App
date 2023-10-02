
<template>
    <div class="container">
        <div class="card-picture">
             <img src="../components/swords.png" alt="" class="some-picture"> 
        </div>
        <div class="event-wrapper">
            
           
                <h1 class="event-day">SHOP</h1>
              
                
                <h2 class="event-title">Check out our available products! </h2>
                  
                <br>
                <button class="allEvents" >SHOP</button>
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
.event-wrapper >*{
    color:black;
}


.container{
   
   background-color:#f2ffe6;
  position:relative;
   opacity:.9;
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
     background-image: url('../components/tree.png'); 
     background-size: cover;
     background-repeat: no-repeat;
   opacity:10%;
   z-index:-1;
  }
    
.event-title{
    /* padding-left:1rem; */
    font-weight:inherit;
    font-style: italic;
    
    padding-top:2rem;
   
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
  background: #bb76ffa1;
font-size:1.1rem;
font-weight:bold;
border-radius: 2rem;
padding:.8rem 2rem;

}

</style>










