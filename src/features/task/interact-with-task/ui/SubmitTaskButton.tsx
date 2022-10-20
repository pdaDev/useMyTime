import {FC, useEffect, useState} from "react";
import {usePatchTaskMutation} from "../../../../entities/project";
import s from './InteractWithTask.module.scss'
import {useNotify} from "../../../../shared";
import {useTranslation} from "react-i18next";


interface SubmitTaskButtonProps {
    fulfilled: boolean,
    id?: number
}

export const SubmitTaskButton: FC<SubmitTaskButtonProps> = ({fulfilled, id}) => {
    const [patch, { isError }] = usePatchTaskMutation()
    const { t } = useTranslation()
    useNotify(isError, t("errors.taskNotChecked") , 'error')
    const [isFulfilled, setIsFulfilled] = useState<boolean>(fulfilled)
    useEffect(() => {
        isError && setIsFulfilled(fulfilled)
    }, [isError, fulfilled])

    const toggleTaskFullFilledStatus = async (e: Event) => {
        e.stopPropagation()
        setIsFulfilled(!isFulfilled)
        await patch({id, fulfilled: !fulfilled}).unwrap()
    }

    return <div onClick={toggleTaskFullFilledStatus as any}
                className={s.submit_button}
                data-active={isFulfilled}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
            <path fill-rule="evenodd"
                  d="M5.85725,10.5565 L2.29325,6.9925 C1.90225,6.6015 1.90225,5.9695 2.29325,5.5785 C2.68425,5.1875 3.31625,5.1875 3.70725,5.5785 L5.85725,7.7285 L10.29325,3.2925 C10.68425,2.9025 11.31625,2.9025 11.70725,3.2925 C12.09825,3.6835 12.09825,4.3165 11.70725,4.7065 L5.85725,10.5565 Z"/>
        </svg>
    </div>
}