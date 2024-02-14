<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <div class="wrappity-wrap">
    <TheHeader />

    <main class="global-main">
      <router-view></router-view>
    </main>

    <div class="footer-wrap">
      <TheFooter />
    </div>
  </div>
</template>

<style>
.global-main{
  flex: 1 0 auto; 
  height:100%;
}

.wrappity-wrap{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.footer-wrap{
  padding-top:2.8rem;
  display:block;
  flex-shrink: 0;
}

html{
  background: rgb(34, 0, 73);
  height:100%;
}

button, input[type="button"], input[type="submit"] {
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  color: inherit;
}

</style>

