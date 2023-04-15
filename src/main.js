import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

createApp(App).use(router).mount('#app')

// 全局引入Toast
import '../public/Toaster/toaster.css';
import toastr from '../public/Toaster/toastr.js';
toastr.options = {
    "closeButton": true,//是否显示关闭按钮
    "debug": false,//是否使用debug模式
    "positionClass": "toast-bottom-right",//弹出窗的位置
    "onclick": null,
    "showDuration": "1000",//显示的动画时间
    "hideDuration": "1000",//消失的动画时间
    "timeOut": "8000",//展现时间
    "extendedTimeOut": "5000",//加长展示时间
    "showEasing": "swing",//显示时的动画缓冲方式
    "hideEasing": "linear",//消失时的动画缓冲方式
    "showMethod": "fadeIn",//显示时的动画方式
    "hideMethod": "fadeOut"//消失时的动画方式
}

// 全局引入dataformat
import "../public/static/dateformat.js"
//时钟插件
import "../public/static/jquery.thooClock.js"
//cookie
import 'vue-cookies'

//
// import axios from 'axios'
// App.config.globalProperties.$axios = axios