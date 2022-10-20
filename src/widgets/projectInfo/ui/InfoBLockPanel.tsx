import {FC} from "react";
import s from './ProjectInfo.module.scss'
import {getTypeValue, ProjectInfoEl, useDeleteProjectMutation} from "../../../entities/project";
import {Title, toLocalFormat, useNotify, useRedirect} from "../../../shared";
import {EditProjectTypeSelect} from "../../../features/project/editProjectType";
import {HiddenInput} from "../../../shared/ui/Form";
import {ChooseProjectPriorityForm} from "../../../features/project/chooseProjectPriority";
import {useTranslation} from "react-i18next";
import {EmployeesOnProjectCard} from "../../../entities/employee";

interface InfoBLockPanelProps {
    isOwner: boolean
    isMember: boolean
    patch: Function
    id: number
    data: any | undefined
    projectTypes: any[] | undefined
    loading: boolean
    openCalendar: Function
    directionTypes: any[] | undefined
    employees: any[]
    deadline?: string
}

export const InfoBLockPanel: FC<InfoBLockPanelProps> = ({
                                                            isOwner,
                                                            projectTypes,
                                                            openCalendar,
                                                            id,
                                                            directionTypes,
                                                            data,
                                                            loading,
                                                            employees,
                                                            patch,
                                                            isMember, deadline
                                                        }) => {
    const [deleteP, {isError: deleteProjectError, isSuccess: deleteProjectSuccess}] = useDeleteProjectMutation()

    const {t} = useTranslation()
    const hasOrder = (projectTypes && data && getTypeValue(projectTypes, data.type) === 'Заказ') || false
    useRedirect('/projects', deleteProjectSuccess, true)
    useNotify(deleteProjectError, t("errors.projectNotDeleted"), 'error')
    const deleteProject = async () => {
        await deleteP(id)
    }
    const savePriority = async (priority: number) => {
        await patch({priority, id}).unwrap()
    }
    const saveTypeOfProject = async (type: number) => {
        if (getTypeValue(projectTypes!, type) !== 'Заказ' && data!.order !== null) {
            await patch({type, id, order: null})
        } else await patch({type, id}).unwrap()
    }
    const saveOrder = async (order: string) => {
        await patch({order, id}).unwrap()
    }
    const saveDirection = async (direction_type: number) => {
        await patch({direction_type, id}).unwrap()
    }
    return <div className={s.info_block}>
        <ProjectInfoEl title={'start_date'}
                       loading={loading}
        >
            <div className={s.deadline_wrapper} data-is-owner={isOwner}
                 onClick={() => isOwner && openCalendar('sinceDate')}>
                <Title type={3}
                       message={data ? toLocalFormat(data.start_date) : undefined}
                />
            </div>
        </ProjectInfoEl>
        <div className={s.for_phone_date}>
            <ProjectInfoEl title={'deadline'}
                           loading={loading}>
                <div className={s.deadline_wrapper}
                     data-is-owner={isOwner}
                     onClick={() => isOwner && openCalendar('toDate')}>
                    <Title type={3}
                           message={deadline ? toLocalFormat(deadline) : undefined}
                    />
                </div>
            </ProjectInfoEl>
        </div>
        <EditProjectTypeSelect title={'type'}
                               types={projectTypes}
                               isOwner={isOwner}
                               type={data?.type}
                               loading={loading}
                               saveType={saveTypeOfProject}/>
        <EditProjectTypeSelect title={'direction_type'}
                               types={directionTypes}
                               loading={loading}
                               isOwner={isOwner}
                               type={data?.direction_type}
                               saveType={saveDirection}/>
        {(hasOrder || loading)
            && <ProjectInfoEl title={'order'}
                              loading={loading}
            >
                <div className={s.order_name}>
                    <HiddenInput type={'input'}
                                 onSave={saveOrder}
                                 enableEdit={isOwner}
                                 defaultText={data?.order || ''}
                    />
                </div>
            </ProjectInfoEl>}
        <ChooseProjectPriorityForm enableEdit={isOwner}
                                   loading={loading}
                                   savePriority={savePriority}
                                   priority={data?.priority}
        />
        {<EmployeesOnProjectCard employees={employees || []}
                                              ownerId={data?.owner || 0}
                                              canInvite={isOwner || isMember}
                                              projectId={+id}
                                              loading={loading}
        />
        }
        {isOwner && !loading && <div onClick={deleteProject} className={s.delete_button}>{
            t("project.delete")}
        </div>

        }


    </div>
}