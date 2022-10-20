import {FCProp} from "../../../shared/lib/types";
import {useTranslation} from "react-i18next";
import s from './ProjectCard.module.scss'
import {Title} from "../../../shared";


interface ProjectInfoElProps {
    title: string
    loading: boolean
}

export const ProjectInfoEl: FCProp<ProjectInfoElProps> = ({title, children, loading}) => {
    const { t } = useTranslation()
    return <div className={s.project_info_el}
                data-loading={loading}
    >
        <div>
            <Title type={3}
                   message={t(`project.${title}`)}
                   weight={'medium'}
                   color={"secondary"}
            />
        </div>

        {
            children
        }
    </div>

}

