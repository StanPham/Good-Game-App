<script setup>
import router from '../router'

const goPP = () => router.push('/privacy');
</script>

<template>
    <div class="footer flex-c-c wrap black">
        <div class="icon-flex-container">
            <a href='https://discord.com/invite/AmCadcysE4'>
                <img src="../images/discord.svg" alt="" class="icon">
            </a>
            <a href='https://www.facebook.com/GoodGameRsvlAR/'>
                <img src="../images/facebook.svg" alt="" class="icon">
            </a>
            <a href='https://www.instagram.com/goodgamersvl'>
                <img src="../images/instagram.svg" alt="" class="icon">
            </a>
        </div>
        <br>
        <div class="copyright">© Good Game 2023</div>
        <div class="privacy-policy" @click="goPP">Privacy Policy</div>
        <div class="pnumber">479-219-5162</div>
        <div class="email">goodgame.rsvl.ar@gmail.com</div>
    </div>
</template>
      
<style scoped>
.footer{
    width:100%;
    padding: 1rem 15%;
    gap:2vw;
}

.icon{
    width:3rem;
    filter: invert(100%) sepia(1%) saturate(7418%) hue-rotate(290deg) brightness(105%) contrast(98%);
    padding-left:1rem;
}

.privacy-policy{
    color:purple;
    cursor:pointer;
}
</style>


