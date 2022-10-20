import s from './CircleTimer.module.scss'
import {FC, useEffect} from "react";
import {CircleDiagram, convertSecondsToTimeFormat, getMinute, Title} from 'shared'
import {Timer} from "../../number-timer/ui/Timer";
import {useDispatch, useSelector} from "react-redux";
import {setTaskStartTime, TimerSelectors} from 'entities/timer'


interface CircleTimerProps {
    isSelectedProject: boolean
    projectTimeToday: any
    activeTaskId: number | null
    loading: boolean
    totalTimeForTask: number
    taskTotalTimeSuccess: boolean
    taskTotalTimeLoading: boolean
}

export const CircleTimer: FC<CircleTimerProps> = ({
                                                 isSelectedProject,
                                                 taskTotalTimeLoading,
                                                 taskTotalTimeSuccess,
                                                 activeTaskId,
                                                 totalTimeForTask,
                                                 loading,
                                                 projectTimeToday
                                             }) => {


    let projectTime = useSelector(TimerSelectors.getTime)
    const taskTime = useSelector(TimerSelectors.getTaskTime)
    const reduxActiveTask = useSelector(TimerSelectors.getActiveTask)

    const d = useDispatch()
    const taskTimeInLocalFormat = convertSecondsToTimeFormat(totalTimeForTask ? ~~totalTimeForTask : 0)
    useEffect(() => {
        if (reduxActiveTask && taskTotalTimeSuccess) {
            d(setTaskStartTime(taskTimeInLocalFormat))
        }
        // eslint-disable-next-line
    }, [reduxActiveTask, d, taskTotalTimeSuccess])
    const time = (!isSelectedProject) ? projectTimeToday : projectTime

    return <div className={s.circle_timer}>
        <CircleDiagram parts={60}
                       part={getMinute(time)}
                       zeroStart={"top"}/>
        <div className={s.number_timer}>
            {!loading && <Timer deftime={time} loading={false}/>}
            {
                activeTaskId && <Title type={5}
                                       loading={taskTotalTimeLoading}
                                       message={taskTotalTimeLoading ? null : isSelectedProject ? taskTime : taskTimeInLocalFormat}
                                       color={'secondary'}/>
            }
        </div>
    </div>
}