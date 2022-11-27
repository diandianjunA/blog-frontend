import {createRouter, createWebHistory} from "vue-router";
import Home from "@/components/Home";
import Text from "@/components/Text"
const routes = [
    {
        path:"/",
        redirect:"/home"
    },
    {
        path: "/home",
        component:Home,
        meta:{
            keepalive:true
        }
    },
    {
        path: "/text",
        component:Text,
        meta:{
            keepalive:true
        }
    }
];
const router=createRouter({
    history: createWebHistory(),
    routes,
})
export default router
