import {FC, useMemo, useState} from "react";
import s from './InviteFriend.module.scss'
import {Form, Title, useNotifyFunction} from 'shared'
import {useTranslation} from "react-i18next";
import {SubmitHandler, useForm} from "react-hook-form";
import {useInviteNewMemberMutation} from "../../../../entities/project";
import {TextInput} from "../../../../shared/ui/Form";
import classNames from "classnames";

var CryptoJS = require("crypto-js");


interface InviteFriendFormProps {
    projectId: number
    userId: number
    close: () => void
}

interface FormValues {
    email: string
}

export const InviteFriendForm: FC<InviteFriendFormProps> = ({projectId, close}) => {
    const {t} = useTranslation()
    const [invite, { isSuccess} ] = useInviteNewMemberMutation()

    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({mode: 'onChange'})
    const n = useNotifyFunction('ссылку скопирована в буфер обмена', 'success')
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await invite(data.email)
        if (isSuccess) {
            n('Приглашение отправлено', 'success')
            close()
        }
    }

    const [typeOfInvite, setTypeOfInvite] = useState<'byEmail' | 'byLink'>('byEmail')
    const setEmailInvitation = () => setTypeOfInvite('byEmail')
    const setLinkInvitation = () => setTypeOfInvite('byLink')

    const hash = useMemo(() => {
        const encrypted = CryptoJS.AES.encrypt(`${projectId}`, 'youngunicornsrunfree');
        return encrypted.toString()
    }, [projectId])
    const link = `${window.location.host}/invite/${hash}`
    const copyLink = () => {
        navigator.clipboard.writeText(link)
            .then(() => {
                n()
            })
            .catch(() => n("не удалось скопировать ссылку", 'error'))
    }
    return <div className={s.invite_form}
                tabIndex={0}
    >
        <div className={s.block}>
            <div onClick={setEmailInvitation}
                 className={s.title_wrapper}
            >
                <Title type={5} message={t("project.invite.byEmail.title")}/>
            </div>
            {typeOfInvite === 'byEmail' &&
                <div className={s.block_content}>
                    <p>
                        {t("project.invite.byEmail.instruction")}
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Form.TextInput size={'small'}
                                        type={'text'}
                                        config={{placeholder: 'email'}}
                                        validationType={'placeholder'}
                                        error={errors.email?.message}
                                        registerEl={register('email', {required: t("form.required")})}
                        />
                        <Form.Button message={t("project.invite.title")}
                                     type={'primary'}
                                     fullWidth
                                     size={'medium'}
                        />
                    </form>
                </div>
            }
        </div>
        <div className={s.block}>
            <div onClick={setLinkInvitation}
                 className={s.title_wrapper}
            >
                <Title type={5} message={t("project.invite.byLink.title")}/>
            </div>
            {
                typeOfInvite === 'byLink' &&
                <div className={classNames(s.block_content, s.copy_block)}>
                    <p>
                        {t("project.invite.byLink.instruction")}
                    </p>

                    <TextInput type={'text'}
                               size={'small'}
                               validationType={'placeholder'}
                               config={{value: link}}

                    />
                    <Form.Button message={t("project.invite.byLink.button")}
                                 type={'primary'}
                                 fullWidth
                                 size={'medium'}
                                 onClick={copyLink}
                    />
                </div>
            }
        </div>

    </div>
}