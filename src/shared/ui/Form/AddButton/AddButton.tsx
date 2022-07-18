import {FC} from "react";
import s from './AddButton.module.scss'
import {PlusIcon} from "../../Icons";
interface IAddButton {
    size?: 'large' | 'medium' | 'small'
    floating?: boolean
    disabled?: boolean
    handleClick: () => void

}

export const AddButton: FC<IAddButton> = (
    {
        size='medium',
        floating,
        handleClick,
        disabled
    }) => {
    return <button className={s.add_button}
                   data-size={size}
                   disabled={disabled}
                   data-floating={floating}
                   onClick={handleClick}
    >
        <img src={PlusIcon} alt={'plus button'}/>
    </button>


}