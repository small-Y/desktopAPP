import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

// 全局引入Toast
import '../public/Toaster/toaster.css';
import '../public/Toaster/toastr.js';

// 全局引入dataformat
import "../public/static/dateformat.js"

import "../public/static/jquery.thooClock.js"

//
// import axios from 'axios'
// App.config.globalProperties.$axios = axios