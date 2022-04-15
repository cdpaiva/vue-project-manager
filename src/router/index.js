import { createRouter, createWebHashHistory } from "vue-router"
import Home from '../views/Home.vue'
import Kanban from '../views/Kanban.vue'
import NewProject from '../views/NewProject.vue'
import EditProject from '../views/EditProject.vue'

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
    },
    {
        path: '/edit-project/:id',
        component: EditProject,
        props: (route) => ({id: parseInt(route.params.id)})
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router