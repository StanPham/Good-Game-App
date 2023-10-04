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
      <div class="car-text upper">
        <div class="start-day">{{currentSlideText.startday}}</div>
        <div class="start-date">{{currentSlideText.startdate}}</div>
      </div>
      <div class="car-text not-upper">
        <h1 class="car-title">{{ currentSlideText.title }}</h1>
        <div class="start-time">{{currentSlideText.starttime}}</div>
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
  font-size:1rem;
}
.car-text{
  position:absolute;
  
  text-align:center;
  width:clamp(1px,250px,50%);
 
  
 font-family: var(--cool-font);
  display:flex;
  flex-direction: column;
  justify-content: center;
 
  height:150px;
  z-index:1;


}
.car-text::before {
  content: "";
  position: absolute;
  border-radius:50%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #070606;
  
filter: blur(10px);
  z-index: -1;
}
.not-upper{
  top:1%;
  
}
.upper{
  top:60%;
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
    slideTexts: {
      type: Array,
      required: true,
    }
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
    },
    currentSlideText() {
      return this.slideTexts[this.currentImageIndex];
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




