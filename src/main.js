import './assets/main.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import outsideClick from './helperFunc/outsideClick.js';
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";


const pinia = createPinia()
const app = createApp(App)


app.directive('click-outside', outsideClick);


app.use(router)
app.use(pinia)
app.use(VueAwesomePaginate)

app.mount('#app')
