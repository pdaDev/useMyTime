import {stateType} from 'app/store'
import {api} from 'shared'


import {createAsyncThunk} from "@reduxjs/toolkit";


interface ITimerStatus {
    status: boolean,
    start_timer: string,
    task: number | null,
    id: number
    project: number | null
}



export const startTimer = createAsyncThunk<void, void>(
    'timerStart',
    async (_,{rejectWithValue, getState} ) => {
        try {
            const {timer: {activeTaskId, activeProjectId}} = getState() as stateType
            const response = await api.post(`timer/start_task_timer/?${activeTaskId ? `task_id=${activeTaskId}` : `project_id=${activeProjectId}`}`)
            if (response.status < 400) {
            } else return  rejectWithValue('error')
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)


export const stopTimer = createAsyncThunk<void, void>(
    'timerStop',
    async (_, thunkAPI) => {
        try {
            const response = await api.patch('timer/stop_task_timer/')
            if (response.status < 400) {

            } else return  thunkAPI.rejectWithValue('error')
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const getTimerStatus = createAsyncThunk<ITimerStatus, void>(
    'timerStatus',
    async (_, thunkAPI) => {
    try {
        const response = await api.get('timer/timer_info_by_task/')
        if (response.status < 400) {
            return response.data
        } else return  thunkAPI.rejectWithValue('error')
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
}
)
