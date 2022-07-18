import {FC} from "react";
import s from './Loader.module.scss'

export const Loader: FC = () => {
    const radius = 40;
    const C = Math.PI * 2 * radius
    const size = 2 * radius + 10
    return (
        <div className={s.container}

        >
            <svg viewBox={`0 0 ${size} ${size}`}>
                <g className={s.group}>
                    <circle cx={size / 2}
                            className={s.back_circle}
                            cy={size / 2}
                            r={radius}
                            fill='none'
                            stroke={'blue'}
                            strokeWidth={8}
                    />
                    <circle cx={size / 2}
                            className={s.circle}
                            cy={size / 2}
                            r={radius}
                            fill='none'
                            strokeWidth={8}
                            strokeLinecap={"round"}
                            strokeDasharray={`${C}`}
                    />
                </g>

            </svg>

</div>
)
}
