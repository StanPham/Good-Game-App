<template>
    <div class="footer">
      
            <div class="icon-flex-container">
                <img src="../images/discord.svg" alt="" class="icon">
                <img src="../images/facebook.svg" alt="" class="icon">
                <img src="../images/instagram.svg" alt="" class="icon">
            </div>
           
       
        <br>
      
          
                <div class="copyright">© Good Game 2023</div>
                <div class="pp">Privacy Policy | Terms of Service</div>
                <div class="pnumber">479-219-5162</div>
            <div class="email">goodgame.rsvl.ar@gmail.com</div>
      
    </div>
</template>

<style scoped>
.footer{
    background: black;
    width:100%;
    padding: 1rem 15%;
    display:flex;
    flex-wrap:wrap;
    gap:2vw;
    justify-content: center;
    align-items: center;

}
.flex-container-one,
.flex-container-two,
.icon-flex-container,
.info-flex-container{
  
}



.icon{
    width:3rem;
      filter: invert(100%) sepia(1%) saturate(7418%) hue-rotate(290deg) brightness(105%) contrast(98%);
    padding-left:1rem;
}
.pp{
    color:purple;
    cursor:pointer;
}
</style>