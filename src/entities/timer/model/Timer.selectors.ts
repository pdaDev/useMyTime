import {stateType} from "app/store";

export const getState = (state: stateType) => state.timer
export const getTime = (state: stateType) => getState(state).time
export const getStatus = (state: stateType) => getState(state).status