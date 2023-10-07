<template>
    <div class="footer">
        <div class="flex-container-one">
            <div class="icon-flex-container">
                <img src="../images/discord.svg" alt="" class="icon">
                <img src="../images/facebook.svg" alt="" class="icon">
                <img src="../images/instagram.svg" alt="" class="icon">
            </div>
            <div class="pnumber">479-219-5162</div>
        </div>
        <br>
        <div class="flex-container-two">
            <div class="info-flex-container">
                <div class="copyright">© Good Game 2023</div>
                <div class="pp">Privacy Policy | Terms of Service</div>
            </div>
            <div class="email">goodgame.rsvl.ar@gmail.com</div>
        </div>
    </div>
</template>

<style scoped>
.footer{
    padding:1rem 10rem;
    background: black;
    width:100%;

}
.flex-container-one,
.flex-container-two,
.icon-flex-container,
.info-flex-container{
    display:flex;
}
.flex-container-one,
.flex-container-two{
    justify-content:space-between;
}
.icon-flex-container{
    width:150px;
    justify-content: space-between;
}
.info-flex-container{
    width:40%;
    justify-content: space-between;
}
.icon{
    width:40px;
      filter: invert(100%) sepia(1%) saturate(7418%) hue-rotate(290deg) brightness(105%) contrast(98%);
}
.pp{
    color:purple;
    cursor:pointer;
}
</style>