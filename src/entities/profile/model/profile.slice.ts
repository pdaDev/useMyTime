import {AnyAction, createSlice} from "@reduxjs/toolkit";
import {getProfile} from "../../user";

interface IProfileState {
    user: {
        id: number | null
        first_name: string | null
        last_name: string | null
        department: string | null
        appointment: string | null
        email: string | null
        avatar: string | null
        phoneNumber: string | null
        post: null | string
    }

    loading: boolean

}

const initialState: IProfileState = {
    user: {
        id: null,
        first_name: null,
        last_name: null,
        department: null,
        appointment: null,
        email: null,
        avatar: null,
        phoneNumber: null,
        post: null
    },
    loading: false
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getProfile.fulfilled, (state,{payload} ) => {
                state.user = { ...state.user, ...payload}
            })
            .addMatcher(isPending, (state) => {
                state.loading = true
            })
            .addMatcher(isFulfilled, (state) => {
                state.loading = false
            })
    }
})



function isFulfilled(action: AnyAction) {
    return action.type.endsWith('fulfilled')
}

function isPending(action: AnyAction) {
    return action.type.endsWith('pending')
}


export const profileReducer = profileSlice.reducer