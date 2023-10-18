<template>
    <div class="img-container">
        <img class="carousel__item" :src="currentImageSrc" alt="Slide image" />
    </div>
</template>

<style scoped>
.img-container{
    width:300px;
    height:400px;
    background-color: red;
    margin-inline:auto;
    margin-top:200px;
    border-radius: 2rem;
    transform: rotate(10deg);
}
</style>

<script>
export default {
  props: {
    imageSrc: {
      type: Array, // changed to Array
      required: true,
    },
  },

  data() {
    return {
      currentImageIndex: 0, // to track which image we're on
    };
  },

  computed: {
    currentImageSrc() {
      return this.imageSrc[this.currentImageIndex];
    }
  },

  mounted() {
    // Every 3 seconds, update the image
    this.interval = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.imageSrc.length;
    }, 3000); // 3000ms = 3 seconds
  },

  beforeDestroy() {
    // Clear the interval when the component is destroyed
    clearInterval(this.interval);
  },
};
</script>
