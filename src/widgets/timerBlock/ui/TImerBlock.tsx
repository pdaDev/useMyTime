import {FC} from "react";
import {
    CircleTimer,
    TimerSelectors,
    setActiveProject,
    setProjectStartTime,
    setActiveTask, setTouched
} from "../../../entities/timer";
import {convertSecondsToTimeFormat, Title} from "../../../shared";
import {TimerPlayButton} from "../../../features/editTimer";
import s from './TimerBLock.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useGetTimeForTaskQuery} from "../../../entities/project";


interface TImerBlockProps {
    tasks: Array<{ id: number, name: string }> | undefined
    projectId: number
    activeTask: number | null
    projectTimeToday: any
    loading: boolean
}

export const TImerBlock: FC<TImerBlockProps> = ({tasks, projectId, activeTask, loading, projectTimeToday}) => {
    const reduxActiveTask = useSelector(TimerSelectors.getActiveTask)
    const {touched, activeProjectId} = useSelector(TimerSelectors.getState)
    const dispatch = useDispatch()

    const isSelectedProject = activeProjectId === projectId
    const projectTimeInLocalFormat = projectTimeToday ? convertSecondsToTimeFormat(~~projectTimeToday) : '00:00:00'
    const setActiveProjectId = () => {

        if (!isSelectedProject) {
            dispatch(setActiveProject(projectId))
            dispatch(setProjectStartTime(projectTimeInLocalFormat))
            dispatch(setActiveTask(activeTask))
            if (!touched) {
                setTimeout(() => dispatch(setTouched()), 100)
            }
        }
    }
    const activeTaskId = isSelectedProject ? reduxActiveTask : activeTask
    const activeTimerTitle = tasks?.find(t => t.id === activeTaskId)?.name || ''
    const {
        data: totalTimeForTask,
        isSuccess,
        isLoading
    } = useGetTimeForTaskQuery(activeTaskId as number, {
        skip: !activeTaskId
    })
    return <div className={s.project_timer}>
        <div className={s.timer_wrapper}>
            <CircleTimer isSelectedProject={isSelectedProject}
                         projectTimeToday={projectTimeInLocalFormat}
                         activeTaskId={activeTaskId}
                         loading={loading}
                         totalTimeForTask={totalTimeForTask || 0}
                         taskTotalTimeLoading={isLoading}
                         taskTotalTimeSuccess={isSuccess}
            />
        </div>
        <div className={s.button_block}>
            {
                activeTimerTitle && <Title type={4}
                                           message={activeTimerTitle}
                />
            }
            <div className={s.play_button_wrapper}>
                <span onClick={setActiveProjectId}>
                     <TimerPlayButton size={'large'}
                                      loading={loading}
                                      status={isSelectedProject ? undefined : false}
                                      canTouch={true}
                     />
                </span>
            </div>
        </div>
    </div>
}