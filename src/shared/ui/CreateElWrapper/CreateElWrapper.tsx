import {FC, ReactNode} from "react";
import s from './CreateEl.module.scss'
import {useOpenClose} from "../../lib";
import {Layout} from 'shared'

interface CreateElWrapperProps {
    createFormRender: (close: () => void) => ReactNode
    createButtonRender: (handleClick: () => void) => ReactNode
}

export const CreateElWrapper: FC<CreateElWrapperProps> = ({createFormRender, createButtonRender}) => {

    const [isFormOpen, openForm, closeForm] = useOpenClose()
    return <>
        <div className={s.wrap}>
            {createButtonRender(openForm)}
        </div>
        {isFormOpen && <Layout.Popap>
            {createFormRender(closeForm)}
        </Layout.Popap>
        }
    </>
}