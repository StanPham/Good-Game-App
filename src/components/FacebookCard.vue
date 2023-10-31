<template>
  <div id="fb-root"></div>
  <div class="fb-container rel">
    <div class="header-container rc-top-top flex-c-c gradient">
      <h1 class="title-scale cool-font">Follow Us On Facebook!</h1>
    </div>
    
    <div class="fb-page" 
      data-href="https://www.facebook.com/GoodGameRsvlAR/" 
      data-tabs="timeline" 
      data-width="500" 
      data-height="300" 
      data-small-header="true"  
      data-hide-cover="false" 
      data-show-facepile="true">
      <blockquote cite="https://www.facebook.com/GoodGameRsvlAR/" class="fb-xfbml-parse-ignore">
        <a href="https://www.facebook.com/GoodGameRsvlAR/">Good Game</a>
      </blockquote>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'YourComponentName',
  mounted() {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.crossorigin = 'anonymous';
    script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
    script.nonce = 'hBK6wuqC';
    document.body.appendChild(script);
  },
};
</script>

<style scoped>
.header-container{
  height:20%;
}
.fb-container {
  background:black;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
}
.fb_iframe_widget{
  display:block;
  position:absolute;
  top:60%;
  left:50%;
  transform:translate(-50%,-50%);
  
}
</style>
