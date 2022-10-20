import axios from "axios"
import {getToken} from "../../entities/user";

const token = getToken()
    export const api = axios.create({
        baseURL: 'https://use-my-time-demo.herokuapp.com/',
        headers: {
            Authorization: `Token ${token}`
        },
        validateStatus: (status: number) => {
            return status >= 200 && status <= 500
        }
    })
