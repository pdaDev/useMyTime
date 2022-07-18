import {stateType} from "app/store";

export const getState = (state: stateType) => state.projectsList
export const getCurrentPage = (state: stateType) => getState(state).currentPage
export const getLimit = (state: stateType) => getState(state).limit
export const getCountOfPages = (state: stateType) => getState(state).countOfPages
export const getSortBy = (state: stateType) => getState(state).sortBy