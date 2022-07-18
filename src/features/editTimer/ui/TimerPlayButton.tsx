import {FC} from "react";
import s from './TimerPlayButton.module.scss'
import {PLayButton_small} from "../../../shared/ui/Icons";
import {TimerSelectors, togglePlay} from 'entities/timer'
import {useSelector} from "react-redux";
import {appUseDispatch} from "../../../app/store";

interface ITimerPlayButton {
    size: 'large' | 'small'

}

export const TimerPlayButton:FC<ITimerPlayButton> = ({size}) => {
    const isPlay = useSelector(TimerSelectors.getStatus)
    const dispatch = appUseDispatch()
    const togglePlayTimer = () => dispatch(togglePlay)
    return <div className={s.timer_play_button}
                data-play-status={isPlay}
                data-size={size}
                onClick={togglePlayTimer}
    >
        <img src={PLayButton_small} alt={'play button'}/>
    </div>
}