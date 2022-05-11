import axios from "axios";

const baseURL = 'https://light-fantastic-mask.glitch.me//user'

const get = () =>
    axios
        .get(baseURL)
        .then(res => res.data)

const userService = {get}

export default userService