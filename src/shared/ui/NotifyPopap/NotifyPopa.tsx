// eslint-disable
import {FC, useEffect, useState} from "react";
import s from './NotifyPopap.module.scss'
import {NotifyPopapStyled} from "./NotifyModule";
import {AppSelectors} from 'app/store'
import {useSelector} from "react-redux";
import {useOpenClose} from "../../lib";

export const NotifyPopap: FC = () => {
    const [isShow, show, hide] = useOpenClose()
    const [timer, setTimer] = useState<any>()
    const { message, type, count } = useSelector(AppSelectors.getNotification)

    useEffect(() => {
            const clearTimer = () => setTimer(null)
            if (message) {
                show()
                timer && clearTimeout(timer)
                setTimer(setTimeout(() => {
                    hide()
                    clearTimer()
                }, 2000))
            }
        },
        // eslint-disable-next-line
        [message, type, count])
    return <div className={s.popap_wrapper} data-show={isShow}>
        <NotifyPopapStyled message={message} type={type}/>
    </div>
}