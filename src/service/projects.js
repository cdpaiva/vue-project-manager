import axios from "axios"

const baseURL = 'http://localhost:3001/projects'

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

const remove = (id) =>
    axios.delete(`${baseURL}/${id}`)

const projectService = { getAll, getById, getAmount, getKanbanById, create, remove }

export default projectService