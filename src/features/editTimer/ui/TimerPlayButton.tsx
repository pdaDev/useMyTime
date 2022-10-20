import {FC} from "react";
import s from './TimerPlayButton.module.scss'
import {PLayButton_small} from "../../../shared/ui/Icons";
import {setClicks, setStatus, TimerSelectors} from 'entities/timer'
import {useDispatch, useSelector} from "react-redux";

interface ITimerPlayButton {
    size: 'large' | 'small'
    status?: boolean
    canTouch?: boolean
    loading: boolean

}

export const TimerPlayButton: FC<ITimerPlayButton> = (
    {
        size,
        loading,
        status,
        canTouch
    }) => {
    const isPlay = useSelector(TimerSelectors.getStatus)

    const dispatch = useDispatch()
    const togglePlayTimer = () => {
        if (canTouch === undefined || canTouch) {
            dispatch(setStatus(status === false ? true : !isPlay))
            dispatch(setClicks())
        }
    }
    return <div className={s.timer_play_button}
                data-play-status={status ?? isPlay}
                data-size={size}
                data-loading={loading}
                onClick={togglePlayTimer}
    >
        {
            !loading && <img src={PLayButton_small}
                             alt={'play button'}/>
        }
    </div>
}