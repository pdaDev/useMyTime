import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getTimerStatus, setTaskTime, setTime, TimerSelectors} from 'entities/timer'
import {UserSelectors} from 'entities/user'
import {useNotify} from "../../../shared";


export const useToggleTimer = () => {
    const {
        status,
        getStatusError,
        stopStartError,
        activeTaskId,

    } = useSelector(TimerSelectors.getState)
    const isAuthed = useSelector(UserSelectors.getAuthStatus)
    const [timer, setTimer] = useState<any>()
    const dispatch = useDispatch()
    const [hasTask, setHasTask] = useState(!!activeTaskId)
    useEffect(() => {
        setHasTask(!!activeTaskId)
    }, [activeTaskId])
    useEffect(() => {
        if (isAuthed) {
            dispatch(getTimerStatus() as any)
        }
    }, [dispatch, isAuthed])


    useNotify(stopStartError, "errors.error", 'error')
    useEffect(() => {
        if (getStatusError) {
            //throw new Error('Ошибка таймера')
        }
    }, [getStatusError])

    useEffect(() => {
        clearInterval(timer)
        if (status) {
            setTimer(setInterval(() => {
                hasTask && dispatch(setTaskTime())
                dispatch(setTime())
            }, 1000))
        } else {
            clearInterval(timer)
        }
        // eslint-disable-next-line
    }, [status, hasTask,dispatch])


}

