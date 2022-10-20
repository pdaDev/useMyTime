import {FC, useRef, useState} from "react";
import s from './CreateTaskForm.module.scss'
import {Calendar, ChooseTimeClock, Form, getTimeWithoutSeconds, Title, useForceUpdate} from "shared";
import {SubmitHandler, useForm} from "react-hook-form";

import 'i8next'
import {useTranslation} from "react-i18next";
import {Popap} from "shared/ui/Lyaout";
import {TextArea} from "shared/ui/Form";

interface FormValues {
    name: string
    description: string
    deadline: string
}

interface CrateTaskFormProps {
    close: () => void
    loading: boolean
    onSubmit: SubmitHandler<any>
    defaultValues?: FormValues
}

export const CreateTaskForm: FC<CrateTaskFormProps> = ({close, onSubmit, defaultValues, loading}) => {
    const {
        register, handleSubmit, formState: {
            errors
        },setValue
    } = useForm<FormValues>({
        mode: 'onChange', defaultValues: {
            name: defaultValues?.name || '',
            description: defaultValues?.description || ''
        }
    })

    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [isSetTimeFormOpen, setIsSetTimeFormOpen] = useState(false)
    const date = useRef(defaultValues ? new Date(defaultValues.deadline) : new Date())
    const nextTimeValues = [30, 1, 3]
    const render = useForceUpdate()
    const {t} = useTranslation()
    register("deadline")
    const saveDeadLine = () => {
        setValue('deadline', date.current.toJSON())
    }
    return <>
        <div>

        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={s.create_edit_task_form}>
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

                <div className={s.set_time}>
                    <div>
                        <Title type={4}
                               weight={'medium'}
                               message={t("createTask.time")}/>
                        <div onClick={() => setIsSetTimeFormOpen(true)} className={s.date_wrapper}>
                            <Title type={4} message={getTimeWithoutSeconds(date.current.toLocaleTimeString())}/>
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
                             message={t("form.accept")}
                             size={'small'}
                             config={{type: 'submit'}}
                             disabled={loading}
                             onClick={saveDeadLine}
                />
            </div>

        </form>
        {isCalendarOpen && <Popap>
            <Calendar setDate={() => {
                setIsCalendarOpen(false)
                saveDeadLine()
            }} close={() => setIsCalendarOpen(false)} type={'single'} defaultDates={date.current}
            />
        </Popap>}
        {isSetTimeFormOpen && <Popap>
            <ChooseTimeClock type={"single"}
                             close={() => setIsSetTimeFormOpen(false)}
                             setTime={() => {
                                 setIsSetTimeFormOpen(false)
                                 saveDeadLine()
                             }}
                             defaultTime={date.current}
            />
        </Popap>}
    </>
}