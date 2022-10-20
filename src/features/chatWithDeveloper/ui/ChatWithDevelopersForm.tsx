import {FC} from "react";
import s from './ChatWithDevelopers.module.scss'
import 'i8next'
import {useTranslation} from "react-i18next";
import {SubmitHandler, useForm} from "react-hook-form";
import {Form, Title, useNotify} from 'shared'
import {useSendMessageToDevsMutation} from "../../../entities/employee/api/employeesAPI";

interface FormValues {
    message: string
}

export const ChatWithDevelopersForm: FC = () => {
    const { t } = useTranslation()
    const [sendMessage, {isError, isSuccess, isLoading}] = useSendMessageToDevsMutation()
    const onSubmit: SubmitHandler<FormValues> = async data => {
        await sendMessage(data.message).unwrap()
        isSuccess && reset()
    }
    useNotify(isError, t("messagedNotSent"),'error')
    useNotify(isSuccess, t("messageSent"), 'success')
    const {register, handleSubmit, formState: {errors}, resetField, reset} = useForm<FormValues>({mode: 'onChange'})
    return <div className={s.chat_container}>
        <div className={s.title_wrapper}>
            <Title type={2} message={t("contacts.connectWithDev")}/>
        </div>
        <div className={s.chat_with_devs}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Form.TextArea registerEl={register('message', {required: t("form.required")})}
                               error={errors.message?.message || ''}
                               validationType={'placeholder'}

                />
                <div className={s.buttons_block}>
                    <Form.Button type={'secondary'} message={t("contacts.clear")} onClick={() => resetField('message')}/>
                    <Form.Button type={'primary'} message={t("contacts.sendMessage")} disabled={isLoading}/>
                </div>
            </form>
        </div>
    </div>
}