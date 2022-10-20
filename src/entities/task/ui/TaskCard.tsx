import {FC, ReactNode, useMemo} from "react";
import s from './TaskCard.module.scss'
import {Title, toLocalFormatTime} from "shared";
import {useTranslation} from "react-i18next";
import 'i18next'

interface ITask {
    id: number
    name: string
    deadline: string
    fulfilled: boolean
    description: string
}

interface ITaskCard {
    data?: ITask
    active: boolean
    loading?: boolean
    renderSubmitButton: () => ReactNode
    renderDeleteButton: () => ReactNode
    renderEditButtton: () => ReactNode
    canInteract?: boolean
}

export const TaskCard: FC<ITaskCard> = ({
                                            data,
                                            renderDeleteButton,
                                            loading,
                                            active,
                                            renderEditButtton,
                                            renderSubmitButton,
                                            canInteract
                                        }) => {

    const {t} = useTranslation()
    const date = useMemo(() => data ? toLocalFormatTime(new Date(data.deadline)) : '', [data])
    return <div className={s.task_card}
                data-active={active || false}
    >
        <div className={s.task_wrapper}>
            <div className={s.title_wrapper}>
                <div className={s.submit_button} data-loading={loading}>
                    {renderSubmitButton()}
                </div>
                <Title type={4}
                       message={data?.name || ''}
                />
            </div>

            <div className={s.time}>
                <div>
                    <Title type={4}
                           message={t("createTask.deadline")}
                           weight={'regular'}
                           color={'secondary'}
                           loading={loading}
                    />
                    <Title type={4}
                           message={date}
                    />
                </div>
                <div className={s.edit_button} data-loading={loading}>
                    {!loading && canInteract && renderEditButtton()}
                </div>
                <div data-loading={loading} className={s.delete_button}>
                    {!loading && canInteract && renderDeleteButton()}
                </div>

            </div>
        </div>
    </div>
}