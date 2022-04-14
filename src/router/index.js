import { createRouter, createWebHashHistory } from "vue-router"
import Home from '../views/Home.vue'
import Kanban from '../views/Kanban.vue'

const routes = [
    { 
        path: '/', 
        component: Home,
    },
    {
        path:'/kanban/:id',
        component: Kanban,
        props: (route) => ({id: parseInt(route.params.id)})
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router