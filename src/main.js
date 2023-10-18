import './assets/main.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import outsideClick from './helperFunc/outsideClick.js';

const pinia = createPinia()
const app = createApp(App)


app.directive('click-outside', outsideClick);


app.use(router)
app.use(pinia)

app.mount('#app')
