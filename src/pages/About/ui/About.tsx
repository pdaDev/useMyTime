import {FC} from "react";
import {Layout, Title, useTabTitle} from 'shared'
import {useTranslation} from "react-i18next";
import 'i8next'
import s from './About.module.scss'

export const About: FC = () => {
    const { t } = useTranslation()
    useTabTitle(t("navbar.about"))
    return <>
        <Layout.PageTitle title={t("navbar.about")}/>
        <div className={s.about}>
            <Title type={3} message={'UseMyTime v.1'}/>
        </div>
    </>
}