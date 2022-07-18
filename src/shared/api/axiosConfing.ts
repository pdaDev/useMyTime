import axios from "axios"

export const api = axios.create({
    baseURL: 'https://use-my-time-demo.herokuapp.com/',
    validateStatus: (status: number) => {
        return status >= 200 && status <= 500
    }
})
