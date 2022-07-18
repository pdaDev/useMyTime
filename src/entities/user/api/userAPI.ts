import {createAsyncThunk} from "@reduxjs/toolkit";
import {clearToken, getToken, saveToke} from "./tokenAPI";
import {api} from "shared";

interface authData {
    username: string
    password: string
}




export const logout = createAsyncThunk(
    'authUser',
    async (_, thunkAPI) => {
        try {
            const token = getToken()
            await api.post('auth/token/logout/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            }).then(response => response.data)
            clearToken()
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }


    }
)

export interface IUser {
    appointment: string
    department: string
    email: string
    first_name: string
    last_name: string
    manager: null
    password: string
    username: string
    id: number
}

export const authme = createAsyncThunk<IUser, string | undefined>(
    'auth/me',
    async (authToken, thunkAPI) => {
        try {
            const token = authToken
            if (token) {
                const response = await api.get('auth/users/me/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
                if (response.status >= 500) {
                    return thunkAPI.rejectWithValue('500')
                }
                return response.data
            }

        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)


export const signin = createAsyncThunk<void, authData>(
    'auth/signin',
    async (body, thunkAPI) => {
        try {
            const res = await api.post('auth/token/login/', body)
            console.log(res)
            if (res.status < 400) {
                let token = res.data.auth_token
                await thunkAPI.dispatch(authme(token))
                saveToke(token)
            } else return  thunkAPI.rejectWithValue(new Error('404'))

        } catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue(e)
        }
    }
)

interface profileData {

}

export const getProfile = createAsyncThunk<profileData, number>(
    'user/profile',
    async (id, thunkAPI) => {
        try {
            const response = await api.get(``)
            return response.data
        } catch (e) {
           return   thunkAPI.rejectWithValue(e)
        }
    }
)

