import {FC} from "react";
import s from './ArrowButton.module.scss'

interface IArrowButton {
    direction: 'left' | 'right' | 'down' | 'up'
    color: 'primary' | 'secondary' | 'black'
    size: 'large' | 'medium' | 'small'
    handleClick: () => void

}

export const ArrowButton: FC<IArrowButton> = (
    {
        direction,
        color,
        size,
        handleClick
    }) => {
    return <div className={s.arrow_button}
                data-direction={direction}
                data-color={color}
                data-size={size}
                onClick={handleClick}
    >
        {'>'}
    </div>

}
