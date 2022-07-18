import {FC} from "react";
import s from './ProjectCard.module.scss'
import {Title} from "../../../shared";
import {useTranslation} from "react-i18next";
import 'i8next'
import {useNavigate} from "react-router-dom";
import {IProjectListEl} from "../lib/projec.types";

interface IProjectCard {
    loading?: boolean
    data?: IProjectListEl
}

export const ProjectCard: FC<IProjectCard> = ({
    data,
    loading = false
}) => {

    const { t } = useTranslation()
    const n = useNavigate()
    console.log(data)
    const goToProjectPage = () => !loading && n(`/project/${data?.id}`)
    return <div className={s.project_card}
                onClick={goToProjectPage}>
        <div className={s.title_wrapper}>
            <Title type={4}
                   message={data?.name}
                   weight={'semi-bold'}/>
        </div>
        <div className={s.time}>
            <div className={s.title_wrapper}>
                <Title type={4}
                       message={t("projects.totalTime")}
                       color={'secondary'}
                       weight={'medium'}
                       loading={loading}
                />
                &nbsp;&nbsp;
                <Title type={4}
                       message={data?.time}
                       weight={'bold'}/>
            </div>
            <div className={s.priority} data-loading={loading}>
                {data?.priority}
            </div>
        </div>

    </div>
}