import {stateType} from "app/store";

export const getState = (state: stateType) => state.user

export const getName = (state: stateType) => getState(state).data.name
export const getId = (state: stateType) => getState(state).data.id
export const getUserData = (state: stateType) =>getState(state).data
export const getEmail = (state: stateType) => getState(state).data.email
export const getAuthStatus =(state: stateType) => getState(state).isAuthed
export const getAvatar = (state: stateType) => getUserData(state).avatar
export const getIsManager = (state: stateType) => getState(state).isManager
export const getIsAdmin = (state: stateType) => getState(state).isAdmin