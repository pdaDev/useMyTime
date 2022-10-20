// eslint-disable
import {FC, useEffect} from "react";

import s from './InvitePage.module.scss'
import {useInviteNewMemberMutation} from "../../../entities/project";
import {Title, useNotify} from "../../../shared";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {UserSelectors} from 'entities/user'

export const InvitePage: FC = () => {
    const [invite, {isError, isSuccess}] = useInviteNewMemberMutation()
    const email = useSelector(UserSelectors.getEmail)
    const projectId = 2
    const n = useNavigate()
    useEffect(() => {
        invite(email)
        isSuccess && n(`/project/${projectId}`)

    }, [email, projectId, isSuccess, invite, n])
    useNotify(isError, 'Не удалось принять приглашение', 'error')
    return <div className={s.invite_page_wrapper}>
        <Title type={1}
               color={'main'}
               message={'ПРИГЛАШЕНИЕ'}/>
    </div>
}