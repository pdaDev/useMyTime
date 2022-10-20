import {FC, useEffect} from "react";
import {Form, Title, useNotify} from "shared";
import {resetError, signin, UserSelectors} from 'entities/user'
import s from './AuthForm.module.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import 'i8next'
import {appUseDispatch} from "app/store";
import {useSelector} from "react-redux";

interface FormValues {
    login: string
    password: string
}


export const AuthForm: FC = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormValues>({mode: 'onBlur'})
    const dispatch = appUseDispatch()
    const {t} = useTranslation()
    const {error, loading} = useSelector(UserSelectors.getState)
    const onSubmit: SubmitHandler<FormValues> = ({login, password}) => {
        dispatch(signin({
            password,
            username: login
        }))
    }
    useNotify(!!error, t("errors.notAuthed"), 'error')
    useEffect(() => {
        if (error) {
            dispatch(resetError())
            reset()
        }
    }, [error, reset, dispatch])

    return <div className={s.auth_form}>
        <div className={s.flex_center}>
            <Title type={1} message={'UseMyTime'} size={42}/>
            <Title type={2} message={t("auth.title")} color={'secondary'} weight={'semi-bold'}/>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={s.flex_center}>
                <div>
                    <div className={s.login_wrapper}>
                        <Form.TextInput type={'text'}
                                        registerEl={register('login', {required: 'обязательное поле'})}
                                        error={errors.login?.message}
                                        config={{placeholder: t("auth.login")}}
                        />
                    </div>
                    <Form.TextInput type={'password'}
                                    registerEl={register('password', {required: 'обязательное поле'})}
                                    error={errors.password?.message}
                                    config={{placeholder: t("auth.password")}}
                    />
                </div>
            </div>
            <Form.Button type={'primary'}
                         message={t("auth.button")}
                         fullWidth
                         size={'large'}
                         disabled={loading}

            />
        </form>
    </div>
}