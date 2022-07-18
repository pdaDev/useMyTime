import {createSlice} from "@reduxjs/toolkit";


interface ITimerState {
    time: Date
    status: boolean
}


const initialDate = new Date()
initialDate.setHours(0)
initialDate.setMinutes(0)
initialDate.setSeconds(0)

export const timerSlice = createSlice({
    name: 'Timer',
    initialState: {
        time: initialDate,
        status: false
    } as ITimerState,
    reducers: {
        togglePlay: state => {
            state.status = !state.status
        }
    }
})

export const timerReducer = timerSlice.reducer
export const { togglePlay } = timerSlice.actions