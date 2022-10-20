import {FC} from "react";
import s from './ProjectInfo.module.scss'
import {Form, Title, toLocalFormat} from "../../../shared";
import {useTranslation} from "react-i18next";

interface ProjectTitleBlockProps {
    loading: boolean
    isOwner: boolean
    patch: Function
    openCalendar: Function
    id: number
    projectName?: string
    deadline?: string
}

export const ProjectTitleBlock: FC<ProjectTitleBlockProps> = ({
                                                                  loading,
                                                                  projectName,
                                                                  id,
                                                                  isOwner,
                                                                  patch,
                                                                  openCalendar,
                                                                  deadline
                                                              }) => {


    const saveName = async (name: string) => {
        await patch({name, id}).unwrap()
    }

    const {t} = useTranslation()
    return <>
        <div className={s.project_title}
             data-loading={loading}
        >
            <div className={s.title_wrapper}>
                <Form.HiddenInput type={'input'}
                                  onSave={saveName}
                                  enableEdit={isOwner}
                                  semanticType={'h1'}
                                  defaultText={projectName}
                />
            </div>
            <div className={s.for_desktop_date}>
                <Title type={3}
                       message={t("project.deadline")}
                       loading={loading}
                       color={'secondary'}
                       weight={'medium'}
                />
                <div className={s.deadline_wrapper}
                     data-is-owner={isOwner}
                     onClick={() => isOwner && openCalendar('toDate')}>
                    <Title type={3}
                           loading={loading}
                           message={deadline ? toLocalFormat(deadline) : 'no date'}
                    />
                </div>
            </div>
        </div>

    </>
}