// 1. 定义路由组件.
// 也可以从其他文件导入
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import DeskTop from "@/views/DeskTop.vue";

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { 
    name: 'HomePage' ,
    path: '/' ,
    component: HomePage
  },
  { 
    name: 'Login',
    path: '/Login',
    component: LoginPage,
    meta: { transition: 'slide-left' }, 
  },
  { 
    name: 'DeskTop',
    path: '/DeskTop', 
    component: DeskTop 
  },
]

export default routes