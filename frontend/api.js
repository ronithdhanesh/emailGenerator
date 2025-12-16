import axios from "axios";


const api = axios.create({
    baseURL:'https://emailgenerator-lmep.onrender.com'
})

export default api;