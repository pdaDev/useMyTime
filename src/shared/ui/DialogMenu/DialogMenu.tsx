import s from './DialogMenu.module.scss'
import {Title} from "../Title/Title";
import {FCProp} from "../../lib/types";
import {Icons} from 'shared'

interface DialogMenuProp {
    title: string
    defOpen?: boolean
    isOpen: boolean
    toggleOpen: () => void
}
export const DialogMenu: FCProp<DialogMenuProp> = ({children, title,isOpen, toggleOpen, defOpen}) => {


    return <div className={s.dialog_menu_container}>
        <div className={s.dialog_menu}  data-open={isOpen}>
            <div className={s.title} onClick={toggleOpen}>
                <img src={Icons.BlackArrowIcon} alt="arrow" />
                <Title type={3} message={title}/>
            </div>

            {
                (isOpen || defOpen) && <div>
                    {children}
                </div>
            }
        </div>
    </div>
}