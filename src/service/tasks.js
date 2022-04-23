import axios from "axios";

const baseURL = 'http://localhost:3001/tasks'

const getById = (id) => 
    axios
        .get(`${baseURL}/${id}`)
        .then(res => res.data)

const getByProjectId = (id) => 
    axios
        .get(baseURL)
        .then(res => res.data.filter(p=>p.project===id))

const create = (task) => 
    axios
        .post(baseURL, task)
        .then(res => res.data)

const remove = (id) => 
    axios.delete(`${baseURL}/${id}`)

const taskService = { getById, getByProjectId, create, remove }

export default taskService