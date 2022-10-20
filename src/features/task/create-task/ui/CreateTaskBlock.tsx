import {FC} from "react";
import s from "./CreateTaskForm.module.scss";
import {Title, useNotify} from "../../../../shared";
import {useTranslation} from "react-i18next";
import {CreateTaskForm} from "./CreateTaskForm";
import {SubmitHandler} from "react-hook-form";
import {useCreateTaskMutation} from "../../../../entities/project";
import {UserSelectors} from 'entities/user'
import {useSelector} from "react-redux";

interface CreateTaskBlockProps {
    close: () => void
    id: number
}

export const CreateTaskBlock: FC<CreateTaskBlockProps> = ({close, id}) => {
    const { t } = useTranslation()
    const userId = useSelector(UserSelectors.getId)
    const [createTask, {isError, isLoading}] = useCreateTaskMutation()
    useNotify(isError, t("errors.taskNotCreated"), 'error')
    const onSubmit: SubmitHandler<any> = async (data) => {
        await createTask({...data, project: id, assignee: userId}).unwrap()
        close()
    }
    return <div className={s.create_task_form}>
        <Title type={2}
               message={t("createTask.title")}
        />
        <CreateTaskForm close={close}
                        onSubmit={onSubmit}
                        loading={isLoading}
        />
    </div>
}

