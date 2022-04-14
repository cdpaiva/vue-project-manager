import axios from "axios";

const baseURL = 'http://localhost:3001/user'

const get = () =>
    axios
        .get(baseURL)
        .then(res => res.data)

const users = {get}

export default users