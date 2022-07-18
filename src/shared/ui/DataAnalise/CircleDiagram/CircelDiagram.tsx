import {FC, useEffect, useRef, useState} from "react";
import s from './CircleDiagram.module.scss'
import styled from "styled-components";

interface ICircleDiagram {
    parts: number,
    part: number
    zeroStart?: 'top' | 'left' | 'bottom' | 'right'
}


export const CircleDiagram: FC<ICircleDiagram> = ({parts, part = 0, zeroStart='right'}) => {
    const [radius, setRadius] = useState(0)
    const [isInit, initialize] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        setTimeout(() => initialize(true), 100)
        setRadius(ref.current?.parentElement?.clientWidth
            ? ref.current?.parentElement?.clientWidth / 2  : 0 )
    }, [ref.current?.parentElement?.clientWidth])
    const C = Math.PI * 2 * radius
    const size = 2 * radius + 10
    const time = isInit ? part : 0
    return (
        <div className={s.container} ref={ref}
            data-zero-start={zeroStart}
        >
            <Circle radius={size}>
                <svg viewBox={`0 0 ${size} ${size}`}>
                    <g className={s.group}>
                        <circle cx={size / 2}
                                className={s.back_circle}
                                cy={size / 2}
                                r={radius}
                                fill='none'
                                stroke={'blue'}
                                strokeWidth={10}
                        />
                        <circle cx={size / 2}
                                className={s.circle}
                                cy={size / 2}
                                r={radius}
                                fill='none'
                                stroke={time !== 0 ? 'red' : 'transparent'}
                                strokeWidth={10}
                                strokeLinecap={"round"}
                                strokeDasharray={`${C}`}
                                strokeDashoffset={C / parts * (parts - time)}

                        />
                    </g>

                </svg>
            </Circle>
        </div>
    )
}

const Circle = styled.div<{ radius: number }>`
  width: ${props => props.radius}px;
  height: ${props => props.radius}px;
`