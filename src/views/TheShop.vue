<template>
    
    <div class="header"></div>
    <main class="product-container">
        <div class="prac">
            <img src="../components/pikachu.webp" alt="" class="pika">
        </div>
        <div class="prac">
            <img src="../components/pikachu.webp" alt="" class="pika">
        </div>
        <div class="prac">
            <img src="../components/pikachu.webp" alt="" class="pika">
        </div>
        <div class="prac">
            <img src="../components/pikachu.webp" alt="" class="pika">
        </div>
        <div class="prac">
            <img src="../components/pikachu.webp" alt="" class="pika">
        </div>
        <div class="prac">
            <img src="../components/pikachu.webp" alt="" class="pika">
        </div>
        <div class="prac">
            <img src="../components/pikachu.webp" alt="" class="pika">
        </div>
        <div class="prac">
            <img src="../components/pikachu.webp" alt="" class="pika">
        </div>
    </main>
    
</template>

<style scoped>

.header{
    background-color: grey;
    width:100%;
    
}
main{
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
   
    
    
    gap: 2rem;
    max-width:100%;


}
.prac{
    
   
   
    background-color: red;
    
}
img{
    max-height:100%;
}

</style>