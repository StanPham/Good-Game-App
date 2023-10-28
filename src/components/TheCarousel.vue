<template>
  <div class="carousel">
    <div class="img-container rel"  @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd">
        
        <transition mode="out-in">
          <img
            :key="currentSlideText"
            class="carousel-item"
            :src="currentSlideText.img"
            
          />
        </transition>
        <div class="flex-wrapper flex-c rel">
            <div class="car-text abs flex-c column">
              <h1 class="title-big">{{ currentSlideText.title }}</h1>
              <div class="title bold">{{currentSlideText.subtitle}}</div>
              <div class="title">{{currentSlideText.subsubtitle}}</div>
            </div>
        </div>
              
        <button class="carousel-button main-btn-full big-btn abs" @click.stop="navigateToLink">{{currentSlideText.btntxt}}</button>
        
        <button @click="prevImage" class="carousel-nav hover-animation carousel-nav-left abs">←</button>
        <button @click="nextImage" class="carousel-nav hover-animation carousel-nav-right abs">→</button>

        <div class="carousel-dots flex-c abs">
          <span
            v-for="(img, index) in slideContents"
            :key="index"
            :class="{ active: currentImageIndex === index }"
            @click="setIndex(index)"
          ></span>
        </div>
    </div>
  </div>
</template>
    
<style scoped>

.carousel-button:active{
  color:black;
  background:rgb(255, 255, 255);
 }
 
.carousel-button{
  left:50%;
  bottom:20%;
  transform: translate(-50%);
  z-index:99;
}

.flex-wrapper{
  width:100%;
  top:-100%;
}

.car-text{
  text-align:center;
  width:clamp(1px,350px,90%);
  padding-top:3rem;
  padding-bottom:3rem;
  z-index:1;
}

.car-text::before {
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

.img-container {
  height: clamp(50vh, 75vh, 35rem);
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
  top: 0;
  bottom: 0;
  font-size:3rem;
  display:none;
}

.carousel-nav:hover {
  background: rgba(0, 0, 0, 0.13);
}

.carousel-nav-left {
  left: 10px;
}

.carousel-nav-right {
  right: 10px;
}

.carousel-dots {
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


@media screen and (max-height: 480px) and (orientation: landscape) {
  
  
  .car-text {
    font-size: 0.9rem;
    padding-top: 2rem;
    padding-bottom: 3rem;
  }
  
  .carousel-button {
    font-size: 1.1rem;
    bottom:15%;
  }

  
}

</style>

<script>
import router from '../router'
export default {
  props: {
   
    slideContents: {
      type: Array,
      
    }
  },
  
  data() {
    return {
      currentImageIndex: 0,
      startX: 0, 
      currentX: 0,
      touchStartOnButton: false
    };
  },

  computed: {
    // currentImageSrc() {
    //   return this.slideContents.img[this.currentImageIndex];
    // },
    currentSlideText() {
      return this.slideContents[this.currentImageIndex];
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
      this.currentImageIndex = (this.currentImageIndex + 1) % this.slideContents.length;
      this.startInterval();
      
    },

    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.slideContents.length) % this.slideContents.length;
      this.startInterval();
    },

    setIndex(index) {
      this.currentImageIndex = index;
      this.startInterval();
    },
    touchStart(event) {
      this.startX = event.touches[0].clientX;
      this.touchStartOnButton = event.target.tagName === 'BUTTON';
    },

    touchMove(event) {
      this.currentX = event.touches[0].clientX;
    },

    touchEnd() {
      if (this.touchStartOnButton) {
        this.touchStartOnButton = false; 
        return; 
      }
      let difference = this.currentX - this.startX;

      if (difference > 50) { 
        this.prevImage();
      } else if (difference < -50) { 
        this.nextImage();
      } else{
        return;
      }
    },

    navigateToLink() {
    const link = this.currentSlideText.link;
    if (link) {
        
        if (link.startsWith('http://') || link.startsWith('https://')) {
           
            window.open(link, '_blank');
        } else {
            
            router.push(link);
        }
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



