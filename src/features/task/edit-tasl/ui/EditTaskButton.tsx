import {FC} from "react";
import s from './EditTask.module.scss'

interface EditTaskButtonProps {
    open: () => void
}

export const EditTaskButton: FC<EditTaskButtonProps> = ({open}) => {
    const handleButtonClick = (e: Event) => {
        e.stopPropagation()
        open()
    }
    return <div className={s.edit_task_button}
                onClick={handleButtonClick as any}
    >
        <div className={s.icon_wrapper}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M21.707,5.565,18.435,2.293a1,1,0,0,0-1.414,0L3.93,15.384a.991.991,0,0,0-.242.39l-1.636,4.91A1,1,0,0,0,3,22a.987.987,0,0,0,.316-.052l4.91-1.636a.991.991,0,0,0,.39-.242L21.707,6.979A1,1,0,0,0,21.707,5.565ZM7.369,18.489l-2.788.93.93-2.788,8.943-8.944,1.859,1.859ZM17.728,8.132l-1.86-1.86,1.86-1.858,1.858,1.858Z"/>
            </svg>
        </div>

    </div>
}