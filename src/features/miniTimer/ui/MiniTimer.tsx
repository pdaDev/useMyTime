import s from './MiniTimer.module.scss'
import {setProjectStartTime, Timer, TimerSelectors} from "../../../entities/timer";
import {TimerPlayButton} from "../../editTimer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useGetProjectTimeForTodayQuery} from "../../../entities/project";
import {convertSecondsToTimeFormat, useNotify} from "../../../shared";

export  const MiniTimer = () => {
    const navigate = useNavigate()
    const activeProjectId = useSelector(TimerSelectors.getActiveProject)
    const goToActiveProject = () => activeProjectId && navigate(`/project/${activeProjectId}/`)
    const {data:totalTime, isLoading, isError} = useGetProjectTimeForTodayQuery(activeProjectId as any, {
        skip: !activeProjectId
    })
    console.log(totalTime)
    const d = useDispatch()
    useEffect(() => {
        if (totalTime) {
            d(setProjectStartTime(convertSecondsToTimeFormat(~~totalTime)))
        }
    }, [totalTime, d])
    useNotify(isError, 'Произошла ошибка', 'error')
    return <div className={s.timer_block}>
        <div onClick={goToActiveProject} className={s.timer_wrapper}>
            <Timer loading={isLoading}/>
        </div>
        <div className={s.timer_button_wrapper}>
            <TimerPlayButton size={"small"} loading={false} />
        </div>
    </div>
}