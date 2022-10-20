import {stateType} from "app/store";

export const getState = (state: stateType) => state.timer
export const getTime = (state: stateType) => getState(state).time
export const getStatus = (state: stateType) => getState(state).status
export const getActivePrograms = (state: stateType) => getState(state).activePrograms
export const getActiveTask = (state: stateType) => getState(state).activeTaskId
export const getActiveProject = (state: stateType) => getState(state).activeProjectId
export const getTaskTime = (state: stateType) => getState(state).taskTime
export const getTouched = (state: stateType) => getState(state).touched
export const getPlayButtonClicks = (state: stateType) => getState(state).clicks
