<template>
  <div class="carousel">
    <div class="img-container"  @touchstart="touchStart"
     @touchmove="touchMove"
     @touchend="touchEnd">
     
      <transition mode="out-in">
        <img
          :key="currentImageSrc"
          class="carousel-item"
          :src="currentImageSrc"
          
        />
      </transition>
      <div class="car-text">
      <h1 class="car-title">WELCOME TO GOOD GAME</h1>
      <p>lorum ipsum yeeeeeeeeeeeeehaw</p>

    </div>
      <button @click="prevImage" class="carousel-nav carousel-nav-left">←</button>
    <button @click="nextImage" class="carousel-nav carousel-nav-right">→</button>

    <div class="carousel-dots">
      <span
        v-for="(img, index) in imageSrc"
        :key="index"
        :class="{ active: currentImageIndex === index }"
        @click="setIndex(index)"
      ></span>
    </div>
    
    </div>
    
    

  </div>
</template>

<style scoped>
.car-title{
  font-size:2.5rem;
}
.car-text{
  position:absolute;
  top:20%;
  text-align:center;
  width:100%;
  background: #07060648;
 font-family: var(--cool-font);
  display:flex;
  flex-direction: column;
  justify-content: center;

}
.img-container {
  position: relative;
  height: clamp(50vh, 75vh, 30rem);
  width: clamp(50vw,100vw,60rem);
  
 
  
  

}
.carousel-item{
  width:100%;
  min-height:100%;
  max-height:100%;
  object-fit: cover;
  border-radius: 1rem;
  filter:brightness(50%);
}

.carousel-nav {
  position: absolute;
  top: 50%;
  font-size:3rem;
  display:none;
 
}

.carousel-nav-left {
  left: 10px;
  
}

.carousel-nav-right {
  right: 10px;
}

.carousel-dots {
  display: flex;
 justify-content: center;
  position: absolute;
  width:100%;
 
  top: 95%;
}

.carousel-dots span {
  width: 1rem;
  height: 1rem;
  margin: 0 10px;
  background: var(--btn-color);
  border-radius: 50%;
  cursor: pointer;
  
}

.carousel-dots span.active {
  background: white;
}



.v-enter-active, .v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from, .v-leave-to  {
  opacity: 0;
}

@media(min-width:1200px){
  .carousel-nav{
    display:block;
  }
 
}
</style>

<script>
export default {
  props: {
    imageSrc: {
      type: Array,
      required: true,
    },
  },
  
  data() {
    return {
      currentImageIndex: 0,
      startX: 0, 
      currentX: 0
    };
  },

  computed: {
    currentImageSrc() {
      return this.imageSrc[this.currentImageIndex];
    }
  },

  methods: {
    startInterval() {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.interval = setInterval(this.nextImage, 4000);
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.imageSrc.length;
      this.startInterval();
      
    },

    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.imageSrc.length) % this.imageSrc.length;
      this.startInterval();
    },

    setIndex(index) {
      this.currentImageIndex = index;
      this.startInterval();
    },
    touchStart(event) {
      this.startX = event.touches[0].clientX;
    },

    touchMove(event) {
      this.currentX = event.touches[0].clientX;
    },

    touchEnd() {
      let difference = this.currentX - this.startX;

      if (difference > 50) { // If swipe right for more than 50px
        this.prevImage();
      } else if (difference < -50) { // If swipe left for more than 50px
        this.nextImage();
      }
    }
  },
  

  mounted() {
    this.startInterval();
  },

  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>



/* Event Name */

position: absolute;
width: 216px;
height: 144px;
left: 909px;
top: 190px;



/* Ellipse 1 */




/* YuGiOh */

position: absolute;
width: 143px;
height: 48px;
left: 945px;
top: 238px;

font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 40px;
line-height: 48px;
text-align: center;

color: #FFFFFF;

/* Ellipse 1 */

box-sizing: border-box;

position: absolute;
width: 216px;
height: 144px;
left: 909px;
top: 190px;


border: 1px solid #000000;
filter: blur(10px);
