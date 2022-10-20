import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const typesOfSorting = ['priority', 'name', 'start_time', 'end_time', 'type', 'direction_type', 'order']

interface IProjectListSlice {
    limit: number,
    currentPage: number,
    countOfPages: number
    sortBy: typeof typesOfSorting[number]
}


const initialState: IProjectListSlice = {
    limit: 10,
    countOfPages: 0,
    currentPage: 1,
    sortBy: 'priority'
}

const projectListSlice = createSlice({
    name: 'project-list',
    initialState,
    reducers: {
        setPage(state, {payload}: PayloadAction<number>) {
            state.currentPage = payload
        },
        setSortBy (state, {payload}: PayloadAction<IProjectListSlice["sortBy"]>) {
            state.sortBy = payload
        },
        setCountOfPages (state, {payload}: PayloadAction<number>) {
            state.countOfPages = payload
        }
    }
})

export const projectListReducer = projectListSlice.reducer
export const {setPage, setSortBy, setCountOfPages} = projectListSlice.actions