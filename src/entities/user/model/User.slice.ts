import {AnyAction, createSlice} from "@reduxjs/toolkit";
import {authme, IUser, logout} from '../api/userAPI'

interface userState {
    isAuthed: boolean
    loading: boolean
    isManager: boolean
    error: null | Error
    isAdmin: boolean
    data: Omit<IUser, 'first_name' | 'last_name' | 'password'> & { name: string, avatar: null }
}

const initialState: userState = {
    data: {
        appointment: '',
        department: '',
        email: '',
        name: '',
        manager: null,
        username: '',
        id: 0,
        avatar: null
    },
    isManager: true,
    isAdmin: true,
    isAuthed: false,
    loading: false,
    error: null


}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth: (state) => {
            state.isAuthed = true
        },
        resetError: state => {
            state.error = null
        }
    }
    ,
    extraReducers: builder => {
        builder
            .addCase(authme.fulfilled, (state, {payload}) => {
                state.data.id = payload.id
                state.data.appointment = payload.appointment
                state.data.department = payload.department
                state.data.email = payload.email
                state.data.username = payload.username
                state.data.manager = payload.manager
                state.data.name = `${payload.last_name} ${payload.first_name}`
                state.isAuthed = true
                state.loading = false
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthed = false
            })
            .addMatcher(isPending, (state) => {
                state.loading = true
            })
            .addMatcher(isError, (state, {payload}) => {
                state.loading = false
                state.error = payload
            })

    }
})



function isPending(action: AnyAction) {
    return action.type.endsWith('pending')
}

function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}


export const userReducer = userSlice.reducer
export const {setAuth, resetError} = userSlice.actions


