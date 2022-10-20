import {useState} from "react";
import s from './ProjectInfo.module.scss'
import {Calendar, Form, Layout, Title, toJSONDate, useNotify, useOpenClose} from "shared";
import {useTranslation} from "react-i18next";
import {usePatchProjectMutation} from "../../../entities/project";
import {ProjectTitleBlock} from "./ProjectTitleBlock";
import {FCProp} from "../../../shared/lib/types";
import {InfoBLockPanel} from "./InfoBLockPanel";

interface IDates {
    sinceDate: Date
    toDate: Date
}

interface ProjectInfoBlockProps {
    id: number
    data: any | undefined
    employees: Array<{id: number, displayName: string, avatar: string | null }>
    projectTypes: any[] | undefined
    loading: boolean
    isOwner: boolean
    isMember: boolean
    directionTypes: any[] | undefined
}

export const ProjectInfoBlock: FCProp<ProjectInfoBlockProps> = ({
                                                                    id,
                                                                    loading,
                                                                    data,
                                                                    projectTypes,
                                                                    directionTypes,
                                                                    children, employees,
    isOwner, isMember
                                                                }) => {
    const {t} = useTranslation()

    const [patch, {isError}] = usePatchProjectMutation()

    useNotify(isError, t("erors.notSaved"), 'error')
    const saveDeadLine = async (date: IDates) => {
        const start_date = toJSONDate(date.sinceDate)
        const end_date = toJSONDate(date.toDate)
        await patch({end_date, start_date, id}).unwrap()
        closeCalendar()
    }

    const [isCalendarOpen, open, closeCalendar] = useOpenClose()
    const [typeOfSelectedDate, setTypeOfSelectedDate] = useState<'toDate' | 'sinceDate'>('toDate')
    const openCalendar = (type: typeof typeOfSelectedDate) => {
        open()
        setTypeOfSelectedDate(type)
    }
    const saveDescription = async (description: string) => {
        await patch({description, id})
    }
    const descriptionBlock = () => <div className={s.description_block}>
        <Title type={3}
               message={t("project.description")}
               loading={loading}
        />
        {
            data?.description !== undefined && <Form.HiddenInput type={'textarea'}
                                                                 defaultText={data?.description}
                                                                 onSave={saveDescription}
                                                                 enableEdit={isOwner}
            />
        }
    </div>
    return <>
        <div className={s.project_info_block}
        >
            <ProjectTitleBlock loading={loading}
                               isOwner={isOwner}
                               patch={patch}
                               openCalendar={openCalendar}
                               id={id}
                               projectName={data?.name}
                               deadline={data?.end_date}
            />
            <div className={s.for_phone_description}>
                {descriptionBlock()}
            </div>
            <InfoBLockPanel isOwner={isOwner}
                            patch={patch}
                            id={id}
                            employees={employees}
                            isMember={isMember}
                            data={data}
                            projectTypes={projectTypes}
                            loading={loading}
                            openCalendar={openCalendar}
                            deadline={data?.end_date}
                            directionTypes={directionTypes}
            />

            <div>
                {children}
                <div className={s.for_desktop_description}>
                    <div className={s.description_block}>
                        <Title type={3}
                               message={t("project.description")}
                               loading={loading}
                        />
                        <div className={s.description_block_text_wrapper}
                            data-loading={loading}>
                            {
                                data?.description !== undefined && <Form.HiddenInput type={'textarea'}
                                                                                     defaultText={data?.description}
                                                                                     onSave={saveDescription}
                                                                                     enableEdit={isOwner}
                                />
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>

        {isCalendarOpen && <Layout.Popap>
            <Calendar setDate={saveDeadLine}
                      type={'range'}
                      defaultDates={{
                          sinceDate: new Date(data!.start_date),
                          toDate: new Date(data!.end_date),
                      }}
                      defaultChangeStatus={typeOfSelectedDate}
                      close={closeCalendar}
            />
        </Layout.Popap>}
    </>
}