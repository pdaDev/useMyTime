import {FC, useRef, useState} from "react";
import s from './CreateTaskForm.module.scss'
import {Calendar, ChooseTimeClock, Title, Form, useForceUpdate} from "shared";
import {SubmitHandler, useForm} from "react-hook-form";

import 'i8next'
import {useTranslation} from "react-i18next";
import {useCreateTaskMutation} from "../../../../entities/project";
import {Popap} from "shared/ui/Lyaout";
import {TextArea} from "shared/ui/Form";

interface FormValues {
    name: string
    description: string
}

interface CrateTaskFormProps {
    close: () => void
}
export const CreateTaskForm: FC<CrateTaskFormProps> = ({close}) => {
    const {
        register, handleSubmit, formState: {
            errors
        },
    } = useForm<FormValues>({mode: 'onChange'})
    const [createTask] = useCreateTaskMutation()
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [isSetTimeFormOpen, setIsSetTimeFormOpen] = useState(false)
    const date = useRef(new Date())
    const nextTimeValues = [30, 1, 3]
    const render = useForceUpdate()
    const { t } = useTranslation()
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
       await createTask(data as any).unwrap()
    }
    return <>
        <div className={s.create_task_form}>
            <Title type={2}
                   message={t("createTask.title")}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.define_name}>
                    <Title type={3}
                           weight={'medium'}
                           message={t("createTask.taskTitle")}
                    />
                    <Form.TextInput type={'text'}
                                    registerEl={register('name', {required: t("form.required")})}
                                    config={{placeholder: t("createTask.taskTitle")}}
                                    error={errors.name?.message}
                                    size={'small'}
                                    validationType={'placeholder'}
                    />
                </div>

                <Title type={3}
                       weight={'medium'}
                       message={t("createTask.deadline")}
                />

                <div className={s.set_deadLine_wrapper}>
                    <div className={s.set_date}>
                        <Title type={4}
                               message={t("createTask.date")}
                               weight={'medium'}
                        />
                        <div onClick={() => setIsCalendarOpen(true)} className={s.date_wrapper}>
                            <Title type={4}

                                   message={date.current.toLocaleDateString()}/>
                        </div>
                    </div>

                    <div className={s.set_time} >
                        <div >
                            <Title type={4}
                                   weight={'medium'}
                                   message={t("createTask.time")}/>
                            <div onClick={() => setIsSetTimeFormOpen(true)} className={s.date_wrapper}>
                                <Title type={4} message={date.current.toLocaleTimeString()}/>
                            </div>
                        </div>
                        <div className={s.next_time_buttons_wrapper}>
                            {
                                nextTimeValues.map(value => <div className={s.addTime} key={value}
                                                                 onClick={() => {
                                                                     value > 12
                                                                         ? date.current.setMinutes(date.current.getMinutes() + value)
                                                                         : date.current.setHours(date.current.getHours() + value)
                                                                     render()
                                                                 }}
                                >
                                    {value}&nbsp;{value > 12 ? t("createTask.min") : t("createTask.hour")}
                                </div>)
                            }
                        </div>
                    </div>
                </div>
                <Title type={3}
                       weight={'medium'}
                       message={t("createProject.description")}
                />
                <TextArea registerEl={register('description')}
                          error={errors.description?.message || ''}
                />


                <div className={s.buttons_block}>
                    <Form.Button type={'secondary'}
                                 message={t("createProject.declineButton")}
                                 onClick={close}
                                 size={'small'}
                    />
                    <Form.Button type={'primary'}
                                 message={t("createProject.createButton")}
                                 size={'small'}
                    />
                </div>

            </form>
        </div>
        {isCalendarOpen && <Popap>
            <Calendar setDate={() => {
                setIsCalendarOpen(false)
            }} close={() => setIsCalendarOpen(false)} type={'single'} defaultDates={date.current}
            />
        </Popap>}
        {isSetTimeFormOpen && <Popap>
            <ChooseTimeClock type={"single"}
                             close={() => setIsSetTimeFormOpen(false)}
                             setTime={() => setIsSetTimeFormOpen(false)}
                             defaultTime={date.current}
            />
        </Popap>}
    </>
}