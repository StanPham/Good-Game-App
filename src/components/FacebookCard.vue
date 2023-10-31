<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Ensure the SDK is loaded
  if (!document.getElementById('facebook-jssdk')) {
    // Create a script element for the Facebook SDK
    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.async = true;
    script.defer = true;
    script.crossorigin = 'anonymous';
    script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
    script.nonce = "hBK6wuqC";
    document.body.appendChild(script);

    // Re-parse the Facebook content after the SDK loads
    script.onload = () => {
      if (window.FB) {
        FB.XFBML.parse();
      }
    };
  } else {
    // If SDK was already loaded, re-parse the component for Facebook widgets
    if (window.FB) {
      FB.XFBML.parse();
    }
  }
});
</script>



<template>
  <div class="container flex-c-c">
    <!-- Facebook Page Plugin -->
    <div id="fb-root"></div>
    <div class="fb-page" 
         data-href="https://www.facebook.com/GoodGameRsvlAR/" 
         data-tabs="timeline" 
         data-width="500" 
         data-height="300" 
         data-small-header="true" 
         data-adapt-container-width="true" 
         data-hide-cover="false" 
         data-show-facepile="true">
      <blockquote cite="https://www.facebook.com/GoodGameRsvlAR/" 
                  class="fb-xfbml-parse-ignore">
        <a href="https://www.facebook.com/GoodGameRsvlAR/">Good Game</a>
      </blockquote>
    </div>
  </div>
</template>

  <style scoped>
  .container{
      background:black;
      width:100%;
      height:100%;
      border-radius:1rem;
  }
  </style>
