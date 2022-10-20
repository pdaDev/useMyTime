import {AnyAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getTimerStatus, startTimer, stopTimer} from '../api/timerAPI'
import {addSecondToToTimer} from "../lib/helpers";


interface ITimerState {
    time: string
    touched: boolean
    status: boolean
    activeTaskId: number | null
    activeProjectId: number | null
    taskTime: string
    activePrograms: Array<Number>
    stopStartError: boolean
    getStatusError: boolean
    loading: boolean
    clicks: number
}


export const timerSlice = createSlice({
    name: 'Timer',
    initialState: {
        activeProjectId: null,
        time: '00:00:00',
        status: false,
        touched: false,
        taskTime: '00:00:00',
        activeTaskId: null,
        stopStartError: false,
        getStatusError: false,
        loading: false,
        clicks: 0
    } as ITimerState,
    reducers: {
        togglePlay: (state) => {
            state.status = !state.status
            state.touched = true
        },
        setClicks: (state) => {
            state.clicks += 1;
        },
        setActiveTask: (state, {payload}: PayloadAction<number | null>) => {
            state.activeTaskId = payload
        },
        addActiveProgram: (state, {payload}: PayloadAction<number>) => {
            state.activePrograms.push(payload)
        },
        removeActiveProgram: (state, {payload}: PayloadAction<number>) => {
            state.activePrograms.filter(id => id !== payload)
        },
        setTime: (state) => {
            state.time = addSecondToToTimer(state.time)
        },
        setTaskTime: state => {
            state.taskTime = addSecondToToTimer(state.taskTime)
        },
        setStatus: (state, {payload}: PayloadAction<boolean>) => {
            state.status = payload
        },
        setActiveProject: (state, {payload}: PayloadAction<number>) => {
            state.activeProjectId = payload
        },
        setProjectStartTime: (state, {payload}: PayloadAction<string>) => {
            state.time = payload
        },
        setTaskStartTime: (state, {payload}: PayloadAction<string>) => {
            state.taskTime = payload
        },
        setTouched: (state) =>{
            state.touched = true
        }

    },
    extraReducers: builder => {
        builder
            .addCase(startTimer.rejected, state => {
                state.stopStartError = true
                state.status = false
            })
            .addCase(stopTimer.rejected, state => {
                state.stopStartError = true
                state.status = true
            })
            .addCase(startTimer.fulfilled, state => {
                state.stopStartError = false
                state.loading = false
            })
            .addCase(stopTimer.fulfilled, state => {
                state.stopStartError = false
                state.loading = false
            })
            .addCase(getTimerStatus.fulfilled, (state, {payload}: PayloadAction<any>) => {
                if (payload.status === 'inactive') {
                    state.status = false
                } else {
                    state.status = true
                    state.activeProjectId = payload.project
                    state.activeTaskId = payload.task
                    state.touched = true
                }
                state.loading = false

            })
            .addCase(getTimerStatus.rejected, (state) => {
                state.getStatusError = true
            })
            .addMatcher(isPending, (state) => {
                state.loading = true
            })



    }
})

function isPending(action: AnyAction) {
    return action.type.endsWith('pending')
}

export const timerReducer = timerSlice.reducer
export const {
    togglePlay,
    setStatus,
    setActiveTask,
    setTaskTime,
    setTaskStartTime,
    setProjectStartTime,
    setActiveProject,
    addActiveProgram,
    removeActiveProgram,
    setTime,
    setClicks,
    setTouched
} = timerSlice.actions