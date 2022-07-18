import {FC} from "react";
import {Layout, useRedirect, useTabTitle} from "shared";
import {AuthForm} from "../../../features/user/authorize";
import {useTranslation} from "react-i18next";
import {UserSelectors} from 'entities/user'
import {useSelector} from "react-redux";

export const Auth: FC = () => {
    const {t} = useTranslation()
    const isAuthed = useSelector(UserSelectors.getAuthStatus)
    useRedirect('/projects', isAuthed, true)
    useTabTitle(t("auth.title"))
    return <Layout.Center>
        <AuthForm/>
    </Layout.Center>
}