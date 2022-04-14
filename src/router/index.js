import { createRouter, createWebHashHistory } from "vue-router"
import Home from '../views/Home.vue'
import Kanban from '../views/Kanban.vue'
import NewProject from '../views/NewProject.vue'

const routes = [
    { 
        path: '/', 
        component: Home,
    },
    {
        path:'/kanban/:id',
        component: Kanban,
        props: (route) => ({id: parseInt(route.params.id)})
    },
    {
        path: '/new-project',
        component: NewProject
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router