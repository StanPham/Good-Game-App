<template>
  <div class="main-container rc">
    <div class="event-wrapper">
      <div class="text-wrapper">
        <h1 class="reverse-gradient pad rc-top-top text-center">Reserve a Table</h1>
      </div>      
    </div>
  </div>
</template>        
        
               
<style scoped>
.text-wrapper{
  position:relative;
}

.text-wrapper::before {
content: "";
position: absolute;

top: 0;
right: 0;
bottom: 0;
left: 0;

background: #0706065d;

filter: blur(10px);
z-index: -1;
}

.main-container{
position:relative;
width:100%;
height:100%;
}

.main-container::before{
width:100%;
content: "";
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
background-image: url('../images/cardshop.jpg');
filter:brightness(35%);
background-repeat:no-repeat;
background-size:cover;
z-index:-1;
border-radius: 1rem;
} 
  
.event-title{
  font-weight:inherit;
  font-style: italic;
  padding-top:2rem;
}

.event-description{
  padding-top: 5px;
}

</style>









