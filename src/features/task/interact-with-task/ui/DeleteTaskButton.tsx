import {FC} from "react";
import s from './InteractWithTask.module.scss'
import {useNotify} from "../../../../shared";
import {useDeleteTaskMutation} from "../../../../entities/project";
import { useTranslation} from "react-i18next";

interface DeleteTaskButtonProps {
    id: number
}

export const DeleteTaskButton: FC<DeleteTaskButtonProps> = ({id}) => {
    const [deleteTask, { isError}] = useDeleteTaskMutation()
    const { t } = useTranslation()
    useNotify(isError, t("errors.taskNotDeleted"), 'error')
    const handleButtonCLick = async (e: Event) => {
        e.stopPropagation()
       await deleteTask(id)

    }
    return <div className={s.delete_task_button}
                onClick={handleButtonCLick as any}>
        <p>
            ×
        </p>
    </div>
}