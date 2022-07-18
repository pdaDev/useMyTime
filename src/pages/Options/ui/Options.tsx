import {FC} from "react";
import {Form, Layout, useTabTitle} from "shared";
import s from './Options.module.scss'
import 'i8next'
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {AppSelectors, appUseDispatch, setTheme} from 'app/store'


export const Options: FC = () => {
    const { t, i18n} = useTranslation()
    useTabTitle(t("navbar.options"))
    const currentTheme = useSelector(AppSelectors.getTheme)
    const dispatch = appUseDispatch()
    const setLightTheme = () => dispatch(setTheme('light'))
    const setDarkTheme = () => dispatch(setTheme('dark'))
    const setRussian = () => i18n.changeLanguage('ru')
    const setEnglish = () => i18n.changeLanguage('eng')
    return <>
        <Layout.PageTitle title={t("navbar.options")}/>
        <div className={s.switchers_block}>
            <Form.ChooseCouple title={t("options.chooseTheme")}
                               options={
                                   [
                                       {value: 'light', label: t("options.light"), handleClick: setLightTheme},
                                       {value: 'dark', label: t("options.dark"), handleClick: setDarkTheme}
                                   ]
                               }
                               defaultValue={currentTheme}
            />
            <Form.ChooseCouple title={t("options.chooseLanguage")}
                               options={
                                   [
                                       {value: 'ru', label: t("options.ru"), handleClick: setRussian},
                                       {value: 'eng', label: t("options.eng"), handleClick: setEnglish}
                                   ]
                               }
                               defaultValue={i18n.language}
            />
        </div>
    </>
}