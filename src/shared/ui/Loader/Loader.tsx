import {FC} from "react";
import s from './Loader.module.scss'

interface LoaderProps {
    type?: 'inline' | 'block'
}

export const Loader: FC<LoaderProps> = ({type = 'inline'}) => {
    const radius = 40;
    const C = Math.PI * 2 * radius
    const size = 2 * radius + 10
    return (
        <div className={s.loader_wrapper}
             data-loader-type={type}
        >
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
        </div>

)
}
