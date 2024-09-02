import { createRouter,createWebHashHistory } from "vue-router";

const routes = [
    {
        path:'/',
        redirect:'/login'
    },
    {
    name:'login',
    path:'/login',
    component:()=>import('@/views/login/Index.vue')
},
{
    name:'menu',
    path:'/menu',
    component:()=>import('@/views/menu/Index.vue'),
    children:[{
            name:'home',
            path:'/home',
            component:()=>import('@/views/home/Index.vue')      
    },
    {
        name:'set',
        path:'/set',
        component:()=>import('@/views/set/Index.vue')
    }
]
}
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})
export default router