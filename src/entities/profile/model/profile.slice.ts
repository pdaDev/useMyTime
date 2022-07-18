import {AnyAction, createSlice} from "@reduxjs/toolkit";
import {getProfile} from "../../user";

interface IProfileState {
    user: {
        id: number | null
        name: string | null
        dep: string | null
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
        name: null,
        dep: null,
        email: null,
        post: null,
        avatar: null,
        phoneNumber: null,
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
            .addCase(getProfile.fulfilled, (state ) => {
                state.user = { ...state.user}
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