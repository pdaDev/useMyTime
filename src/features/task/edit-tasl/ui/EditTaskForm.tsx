import s from './EditTask.module.scss'
import {FC} from "react";
import {Layout, Title, useNotify} from 'shared'
import {useTranslation} from "react-i18next";
import {SubmitHandler} from "react-hook-form";
import {usePatchTaskMutation} from "../../../../entities/project";
import {CreateTaskForm} from "../../create-task";

interface EditTaskFormProps {
    id: number
    close: () => void
    values: Values
}


type Values = NonNullable<Pick<Parameters<typeof CreateTaskForm>[0], 'defaultValues'>["defaultValues"]>

export const EditTaskForm: FC<EditTaskFormProps> = ({id, close, values}) => {

    const [patch, {isError, isSuccess, isLoading}] = usePatchTaskMutation()
    const { t } = useTranslation()

    useNotify(isError, t("errors.taskNotChanged"), 'error')
    useNotify(isSuccess, t("errors.taskChanged"), 'success')

    const onSubmit: SubmitHandler<Values> = async (data) => {
        const body: Partial<Values> = {}
        console.log(data, values)
        Object.keys(data).forEach(key => {
            //@ts-ignore
            if (data[key] !== values[key]) {
                //@ts-ignore
                body[key] = data[key]
            }
        })
        if (Object.keys(body).length > 0) {
           await patch({...body, id})
        }
        close()

    }
    return <Layout.Popap>
        <div className={s.edit_form}>
            <Title type={2} message={t("createTask.editTaskTitle")}/>
            <CreateTaskForm close={close}
                            onSubmit={onSubmit}
                            defaultValues={values}
                            loading={isLoading}
            />


        </div>
    </Layout.Popap>

}