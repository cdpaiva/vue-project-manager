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

const projectService = { getAll, getById, getAmount, getKanbanById }

export default projectService