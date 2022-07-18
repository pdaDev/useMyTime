import {stateType} from './index'
const getApp = (state: stateType) => state.app


export const getTheme = (state: stateType) => getApp(state).theme
export const getAllThemes = (state: stateType) => getApp(state).themes
export const getNotification = (state: stateType) => getApp(state).notification
export const getInitStatus = (state: stateType) => getApp(state).isInit
