import s from './CircleTimer.module.scss'
import {FC} from "react";
import {CircleDiagram} from 'shared'
import {Timer} from "../../number-timer/ui/Timer";
import {useSelector} from "react-redux";
import {TimerSelectors} from 'entities/timer'

export const CircleTimer:FC = () => {
    const time = useSelector(TimerSelectors.getTime)
    return <div className={s.circle_timer}>
        <CircleDiagram parts={60} part={time.getMinutes()} zeroStart={"top"}/>
        <div className={s.number_timer}>
            <Timer/>
        </div>
    </div>
}