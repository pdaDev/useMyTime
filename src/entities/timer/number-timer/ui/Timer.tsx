import {FC} from "react";
import {Title} from "shared";
import {useSelector} from "react-redux";
import {TimerSelectors} from 'entities/timer'


interface TimerProps {
    deftime?: string
    loading: boolean
}

export const Timer: FC<TimerProps> = ({deftime, loading}) => {
    const time = useSelector(TimerSelectors.getTime)
    return <Title type={2}
                  message={deftime ?? time}
                  loading={loading}/>
}