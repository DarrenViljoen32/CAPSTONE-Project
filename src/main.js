import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import VueCookies from 'vue-cookies'

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap-icons/font/bootstrap-icons.css"



// createApp(App).use(store).use(router).use(VueCookies).mount('#app')
createApp(App).use(store).use(router).use(VueCookies).mount('#app')
