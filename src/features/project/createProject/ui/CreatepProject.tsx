import {FC, useEffect, useRef, useState} from "react";
import s from './CreateProject.module.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import {Calendar, Form, Layout, Title, toJSONDate, useNotify, useRedirect} from 'shared'
import {TextArea} from "shared/ui/Form";
import {CalendarIcon} from "shared/ui/Icons";
import {useTranslation} from "react-i18next";
import 'i8next'
import {getTypeValue, useCreateProjectMutation, useGetTypesOfProjectQuery} from "entities/project";
import {OptionsBlock} from "./OptionsBlock";

interface FormValues {
    name: string
    order?: string
    description: string
}

interface CreateProjectFormProps {
    close: () => void
}

export const CreateProjectForm: FC<CreateProjectFormProps> = ({close}) => {
    const {
        register,
        handleSubmit,
        formState: {errors,},
        unregister
    } = useForm<FormValues>(
        {mode: "onChange", shouldUnregister: true, reValidateMode: 'onBlur'})
    const {t} = useTranslation()
    const [selectedPriority, setPriorityNumber] = useState<number>(1)
    const [calendarState, setCalendarState] = useState<'toDate' | 'sinceDate' | 'closed'>('closed')
    const selectedDate = useRef({sinceDate: new Date(), toDate: new Date()})
    const [createProject, {isError, data, isLoading}] = useCreateProjectMutation()

    useRedirect(`/project/${data?.id}`, !!data, true)
    useNotify(isError, t("errors.projectNotCreated"), 'error')

    const onSubmit: SubmitHandler<FormValues> = async data => {
        await createProject({
            name: data.name,
            priority: selectedPriority,
            end_date: toJSONDate(selectedDate.current.toDate),
            start_date: toJSONDate(selectedDate.current.sinceDate),
            description: data.description || '',
            type: +typeOfProject,
            direction_type: +typeOfDirection,
            order: data.order || null
        }).unwrap()

    }
    const selectPriority = (num: number) => {
        setPriorityNumber(num)
    }
    const selectDeadLine = () => {
        setCalendarState('closed')

    }

    const {data: projectTypes } = useGetTypesOfProjectQuery()
    const countOfAvailablePriorities = 5
    const [typeOfProject, setTypeOfProject] = useState<string>('')
    const [typeOfDirection, setDirectionType] = useState<string>('')
    const hasOrder = (projectTypes && getTypeValue(projectTypes!, +typeOfProject) === "Заказ") || false
    useEffect(() => {
        if (!hasOrder) {
            unregister('order')
        }
    }, [hasOrder, register, unregister])
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
                                    .map((_, i) => <div
                                        className={`${s.priority} ${i + 1 === selectedPriority && s.active}`}
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
                <OptionsBlock registerInput={register}
                              setTypeOfProject={setTypeOfProject}
                              setDirectionType={setDirectionType}
                              typeOfDirection={typeOfDirection}
                              typeOfProject={typeOfProject}
                              error={errors.order?.message}
                              hasOrder={hasOrder}
                />
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
                                 disabled={isLoading}
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