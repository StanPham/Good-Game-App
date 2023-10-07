<template>
<div class="container">
    <div class="header">
        <button class="start">Start</button>
        <div class="score">Score: </div>
    </div>
    <div class="minigame"></div>
</div>
</template>
<style scoped>
.container{
    background:black;
    width:100%;
    height:100%;
    border-radius:1rem;
}
.header{
    width:100%;
    text-align:center;
    padding-top:1rem;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
}
.start{
    background:black;
    border: white 2px solid;
    padding:.5rem 2rem;
    width:25%;
}
.score{
    padding-top:1rem;
   
}
</style>