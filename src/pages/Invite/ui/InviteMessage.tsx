import {FC, useEffect, useMemo} from "react";
import {Form, Loader} from "shared";
import s from './InviteMessage.module.scss'
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useAddNewMemberToProjectMutation} from "../../../entities/project";
import {useSelector} from "react-redux";
import {UserSelectors} from 'entities/user'

var CryptoJS = require("crypto-js");

export const InviteMessage: FC = () => {
    const {code} = useParams()
    const {t} = useTranslation()
    const n = useNavigate()
    const user_id = useSelector(UserSelectors.getId)

    const [acceptInvite, {isSuccess, isLoading}] = useAddNewMemberToProjectMutation()
    const project_id = useMemo(() => {
        return CryptoJS.AES
            .decrypt(code, "youngunicornsrunfree")
            .toString(CryptoJS.enc.Utf8)
    }, [code])
    useEffect(() => {

    }, [project_id, user_id])

    const goToProject = () => {
        n(`project/${project_id}`)
    }
    useEffect(() => {
        if (project_id && user_id) {
            acceptInvite({project_id, user_id}).unwrap()
        }
    }, [code, project_id, user_id, acceptInvite])
    return (
        <div className={s.container}>
            {
                isLoading
                    ? <Loader/>
                    : (
                        <div className={s.invite_card_container}>
                            <div className={s.invite_card}>
                                {
                                    t(`invite.${isSuccess ? 'success' : 'error' }`)
                                }
                            </div>
                            {
                                isSuccess && (
                                    <Form.Button type={'primary'}
                                                 message={t("invite.goToProject")}
                                                 onClick={goToProject}
                                                 size={'large'}
                                                 fullWidth
                                    />
                                )
                            }

                        </div>
                    )

            }
        </div>
    )
}