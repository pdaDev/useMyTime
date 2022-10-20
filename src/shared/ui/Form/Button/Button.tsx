import {FC} from "react";
import s from './Button.module.scss'

interface IButtonProps {
    type: 'primary' | 'secondary' | 'spy'
    message: string
    disabled?: boolean
    fullWidth?: boolean
    icon?: string
    size?: 'large' | 'medium' | 'small'
    onClick?: any
    config?: {
        type?: 'submit' | 'button' | 'reset'
    }
}

export const Button: FC<IButtonProps> = ({
                                             type,
                                             message,
                                             disabled = false,
                                             fullWidth = false,
                                             size = 'medium',
                                             icon,
                                             onClick, config

                                         }) => {
    return <button data-button-type={type}
                   className={s.button}
                   data-fullwidth={fullWidth}
                   disabled={disabled}
                   data-size={size}
                   type={onClick ? 'button' : 'submit'}
                   onClick={onClick as any}
                   {...config}
    >
        {
            icon && <img src={icon} alt={'button icon'}/>
        }
        <div className={s.text_wrapper}>
            <span>{message}</span>
        </div>
    </button>
}