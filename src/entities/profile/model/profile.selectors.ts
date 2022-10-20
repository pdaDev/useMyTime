import {stateType} from "app/store";

export const getState = (state: stateType) => state.profile.user
export const getFirstName = (state: stateType) => getState(state).first_name
export const getAvatar = (state: stateType) => getState(state).avatar
export const getDep = (state: stateType) => getState(state).department
export const getEmail = (state: stateType) => getState(state).email
export const getPhoneNumber = (state: stateType) => getState(state).phoneNumber
export const getPost = (state: stateType) => getState(state).post
export const getLoading = (state: stateType) => state.profile.loading