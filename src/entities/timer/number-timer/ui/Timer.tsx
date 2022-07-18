import {FC} from "react";
import {Title} from "shared";
import {useSelector} from "react-redux";
import {TimerSelectors} from 'entities/timer'




export const Timer: FC = () => {
    const time = useSelector(TimerSelectors.getTime)
    return <Title type={2} message={time.toLocaleTimeString()}/>
}