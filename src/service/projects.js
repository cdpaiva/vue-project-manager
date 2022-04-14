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

const projects = { getAll, getById, getAmount }

export default projects