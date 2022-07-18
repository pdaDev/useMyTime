import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./slice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {userReducer} from "entities/user";
import {timerReducer} from "entities/timer";
import {profileReducer} from "../../entities/profile";
import {ProjectApi} from 'entities/project'
import {projectListReducer} from 'entities/project'
export const store = configureStore({
    reducer: {
        app: appReducer,
        user: userReducer,
        timer: timerReducer,
        profile: profileReducer,
        [ProjectApi.reducerPath]: ProjectApi.reducer,
        projectsList: projectListReducer
    },
    middleware: (getDefaultMiddleware )=> {
      return  getDefaultMiddleware().concat(ProjectApi.middleware )
    }

})

type storeType = typeof store;
type dispatchType = storeType["dispatch"];
export type stateType = ReturnType<typeof store.getState>

export const appUseSelector: TypedUseSelectorHook<stateType> = useSelector
// eslint-disable-next-line react-hooks/rules-of-hooks
export const appUseDispatch = () => useDispatch<dispatchType>()