import {FC} from "react";
import 'i18next'
import {useTranslation} from "react-i18next";
import {useTabTitle} from 'shared'
import {ProjectList} from "entities/project";


export const Projects: FC = () => {

    const {t} = useTranslation()
    useTabTitle(t("projects.title"))
    return <>
        <ProjectList/>
    </>
}