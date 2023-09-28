<template>
  <div class="wrappa">
    <Carousel :autoplay="2000" :wrap-around="true">
  <Slide v-for="(slide, index) in slides" :key="index">
    <div class="img-container">
    <img class="carousel__item" :src="slide" alt="Slide image" />
  </div>
  </Slide>

  <template #addons>
    <Navigation />
    <Pagination />
  </template>
</Carousel>
</div>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
  import pika from './pikachu.webp'
  import poke from './poke.webp'
  import 'vue3-carousel/dist/carousel.css'
  
  export default defineComponent({
    name: 'Basic',
    components: {
      Carousel,
      Slide,
      Pagination,
      Navigation,
    },
    data() {
    return {
      slides: [
        poke,
        poke,
        poke,
        // Add more URLs as necessary
      ],
    };
  },
  })
  </script>
  
  <style>
 
  .wrappa{
    padding-top:2.8rem;
  }
  .img-container{
    width:100%;
    max-height: 30rem;
  }
  .carousel__item {
    
    width:100%;
    height:100%;
    object-fit: cover;
    
    display:block;
   
    background-color: var(--vc-clr-primary);
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
   
    justify-content: center;
    align-items: center;
  }

  
  .carousel__prev,
  .carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
  }

  @media(min-width:768px){
    .wrappa{
    max-width: 60%;
    
  }
  }
  </style>
  