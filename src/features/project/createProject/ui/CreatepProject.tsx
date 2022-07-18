import {FC, useRef, useState} from "react";
import s from './CreateProject.module.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import {Calendar, Form, Layout, Title, useNotify} from 'shared'
import {TextArea} from "shared/ui/Form";
import {CalendarIcon} from "shared/ui/Icons";
import {useTranslation} from "react-i18next";
import 'i8next'
import {useCreateProjectMutation} from "entities/project";

interface FormValues {
    name: string

    description: string
}

interface CreateProjectFormProps {
    close: () => void
}

export const CreateProjectForm: FC<CreateProjectFormProps> = ({close}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({mode: "onChange"})
    const [selectedPriority, setPriorityNumber] = useState<number>(1)
    const [calendarState, setCalendarState] = useState<'toDate' | 'sinceDate' | 'closed'>('closed')
    const selectedDate = useRef({sinceDate: new Date(), toDate: new Date()})
    const [createProject, {isError}] = useCreateProjectMutation()

    useNotify(isError,'Не удалось создать проект', 'error')

    const onSubmit: SubmitHandler<FormValues> = async data => {

        await createProject({
            name: data.name,
            priority: selectedPriority,
            deadline: selectedDate.current.toDate.toLocaleDateString(),
            description: data.description || '',
            users: []
        }).unwrap()

    }
    const selectPriority = (num: number) => {
        setPriorityNumber(num)
    }
    const selectDeadLine = () => {
        setCalendarState('closed')

    }
    const {t} = useTranslation()

    const countOfAvailablePriorities = 5
    return <>
        <div className={s.create_project_form}>
            <Title type={2} message={t("createProject.title")}/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.twoElOnRow}>
                    <div>
                        <Title type={3}
                               message={t("createProject.projectTitle")}
                               weight={'medium'}
                        />
                        <Form.TextInput type={'text'}
                                        registerEl={register('name', {required: t("form.required")})}
                                        config={{placeholder: t("createProject.projectTitle")}}
                                        size={'small'}
                                        error={errors.name?.message}
                                        validationType={'placeholder'}
                        />
                    </div>
                    <div>
                        <Title type={3}
                               message={t("createProject.projectPriority")}
                               weight={'medium'}
                        />
                        <div className={s.select_priority}>
                            {
                                Array.apply(null, new Array(countOfAvailablePriorities))
                                    .map((_, i) => <div className={`${s.priority} ${i + 1 === selectedPriority && s.active}`}
                                                        onClick={() => selectPriority(i + 1)}
                                    >
                                        {i + 1}
                                    </div>)
                            }
                        </div>
                    </div>

                </div>

                <div className={s.define_project_scope}>
                    <Title type={3}
                           message={t("createProject.deadline")}
                           weight={'medium'}
                    />

                    <div className={s.select_dates_container}>
                        <div className={s.select_date_wrapper} onClick={() => setCalendarState('sinceDate')}>
                            <Title type={3} message={selectedDate.current?.sinceDate.toLocaleDateString() || ''}/>
                        </div>
                        <div className={s.select_date_wrapper} onClick={() => setCalendarState('toDate')}>
                            <Title type={3} message={selectedDate.current?.toDate.toLocaleDateString() || ''}/>
                        </div>

                        <div className={s.choose_date} onClick={() => setCalendarState('toDate')}>
                            <img src={CalendarIcon} alt={'calendar icon'}/>
                        </div>
                    </div>
                </div>

                <Title type={3}
                       message={t("createProject.description")}
                       weight={'medium'}
                />

                <TextArea registerEl={register('description')}
                          error={errors.description?.message || ''}
                          config={{placeholder: t("createProject.description")}}
                />


                <div className={s.buttons_block}>
                    <Form.Button message={t("createProject.declineButton")}
                                 type={'secondary'}
                                 onClick={close}
                                 size={'small'}

                    />
                    <Form.Button message={t("createProject.createButton")}
                                 type={'primary'}
                                 size={'small'}
                    />
                </div>

            </form>
        </div>
        {
            calendarState !== 'closed' && <Layout.Popap>
                <Calendar setDate={selectDeadLine as any}
                          close={() => setCalendarState('closed')}
                          defaultChangeStatus={calendarState}
                          defaultDates={selectedDate.current}

                />
            </Layout.Popap>
        }
    </>
}