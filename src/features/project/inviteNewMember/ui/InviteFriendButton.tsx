import {FC} from "react";
import {InviteFriendForm} from "./InviteFriendForm";
import {Form} from 'shared'
import s from './InviteFriend.module.scss'
import {useTranslation} from "react-i18next";

interface InviteFriendButtonProps {
    open: () => void
    close: () => void
    isOpen: boolean
}

type FormProps = Parameters<typeof InviteFriendForm>[0]

export const InviteFriendButton: FC<InviteFriendButtonProps & FormProps> = ({isOpen, open, close, ...props}) => {

    const {t} = useTranslation()
    return <>
        {!isOpen && <div className={s.invite_button_wrapper}>
            <Form.Button type={'primary'}
                         message={t("project.invite.title")}
                         size={'medium'}
                         onClick={open}
                         fullWidth
            />
        </div>}
        {
           isOpen && <InviteFriendForm {...props}
                           close={close}

        />
        }
    </>
}