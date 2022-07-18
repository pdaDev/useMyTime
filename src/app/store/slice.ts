import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {types} from 'shared/lib'
import {authme, getToken} from "../../entities/user";
import {Dispatch} from "react";

interface IAppState {
    theme: types.ThemeType
    themes: Array<types.ThemeType>
    isInit: boolean
    notification: {
        message: string,
        type: 'warning' | 'success' | 'error'
        count: number
    }

}

const initialState: IAppState = {
    theme: 'light',
    themes: ['light', 'dark'],
    isInit: false,
    notification: {
        message: '',
        type: 'success',
        count: 1
    }
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setTheme: (state, {payload}: PayloadAction<types.ThemeType>) => {
            state.theme = payload
        },
        initializeApp: (state) => {
            state.isInit = true
        },
        notify(state, {payload}: PayloadAction<Omit<IAppState["notification"], 'count'>>) {
            state.notification.message = payload.message
            state.notification.type = payload.type
            state.notification.count = state.notification.count + 1
        }
    },

})


export const init = () => async (dispatch: Dispatch<any>) => {
    try {
        const token = getToken()
        console.log()
        if (token) {
            await dispatch(authme(token))
        }
        dispatch(initializeApp())
    } catch {
        throw new Error()
    }
}

export const appReducer = slice.reducer
export const {setTheme, initializeApp, notify} = slice.actions


