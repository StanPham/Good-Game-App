<template>
  <div id="fb-root"></div>
  <div class="xd-container rel">
    <div class="fb-page" data-href="https://www.facebook.com/GoodGameRsvlAR/" data-tabs="timeline" data-width="500" data-height="300" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
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
.xd-container {
  background: black;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
}
.fb_iframe_widget{
  position:absolute;
  display:block;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
}
</style>
