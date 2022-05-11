import axios from "axios"
import taskService from "./tasks"

const baseURL = 'https://light-fantastic-mask.glitch.me/projects'

const getAll = () => 
    axios
        .get(baseURL)
        .then(res => res.data)

const getAmount = () => 
    axios
        .get(baseURL)
        .then(res => res.data.length)

const getById = (id) =>
    axios
        .get(`${baseURL}/${id}`)
        .then(res => res.data)

const getKanbanById = (id) => 
    axios
        .get(`${baseURL}/${id}`)
        .then(res => res.data.kanban)

const create = (newProject) =>
    axios
        .post(baseURL,newProject)

const remove = (id) => {
    taskService
    .getByProjectId(id)
    .then((res) => {
        res.map(task => taskService.remove(task.id))
    })
    return axios.delete(`${baseURL}/${id}`)
}

const update = (id, updatedProject) =>
    axios.put(`${baseURL}/${id}`, updatedProject)

const createTask = (id, task) => {
    axios
        .get(`${baseURL}/${id}`)
        .then(res => {
            const project = res.data
            task['id'] = project.kanban.length
            project.kanban.push(task)
            update(id, project)
        })
}

const projectService = { getAll, getById, getAmount, getKanbanById, create, remove, update, createTask }

export default projectService