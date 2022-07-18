import {FC} from "react";
import s from './TaskCard.module.scss'
import {Title} from "shared";
import {useTranslation} from "react-i18next";
import 'i18next'

interface ITask {
    id: number
    name: string
    deadline: string
}

interface ITaskCard {
    data?: ITask
    loading?: boolean
}

export const TaskCard: FC<ITaskCard> = ({data, loading}) => {

    const { t } = useTranslation()
    return <div className={s.task_card}>
        <div className={s.title_wrapper}>
            <Title type={4}
                   message={data?.name}
            />
            <div className={s.time}>
                <Title type={4}
                       message={t("createTask.deadline")}
                       weight={'regular'}
                       color={'secondary'}
                       loading={loading}
                />
                &nbsp;&nbsp;
                <Title type={4}
                       message={data?.deadline}

                />
            </div>
        </div>
    </div>
}