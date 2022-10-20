import {FC} from "react";
import s from './LinearDiagram.module.scss'
import {Title} from "../../Title/Title";
import styled from "styled-components";
import {convertSecondsToTimeFormat, getHour, getMinute, getSecond} from "../../../lib";

interface ILinearDiagram{
    title: string
    values: Array<{
        name: string
        value: number
        label: string
    }>
    total?: number
}

export const LinearDiagram: FC<ILinearDiagram> = ({title, values, total}) => {
    const maxValue = Math.max(...values.map(x => x.value))
    const totalTimeForDay = convertSecondsToTimeFormat(total ? ~~total : 0 )
    const totalTimeWithMeasue = `${getHour(totalTimeForDay)} часов ${getMinute(totalTimeForDay)} минут ${getSecond(totalTimeForDay)} секунд`
    return <div className={s.linear_gistogram}>
        <Title type={3} message={title}/>
        <div className={s.stat}>
            <Title type={4} message={'Сегодня вы работали'} weight={'regular'}/>
            &nbsp;
            <Title type={4} message={totalTimeWithMeasue}/>
        </div>
        <div className={s.gistogram}>
            {
                values
                    .sort((a, b) => a.value - b.value)
                    .map(item => <div className={s.line}>
                        <Title type={4} message={item.name}/>
                        <div className={s.line_with_value}>
                            <LineWrapper width={80 * item.value / maxValue}>
                                <div className={s.animated_line}/>
                            </LineWrapper>
                            <div className={s.value_wrapper}>
                                <Title type={5}
                                       message={item.label}
                                       color={'secondary'}
                                />
                            </div>
                        </div>
                    </div>)
            }
        </div>
    </div>
}

const LineWrapper = styled.div<{ width: number }>`
  width: ${props => props.width}%;
  height: 28px;
  margin-right: 6px;
  
`