import {FC} from "react";
import {Title, useOnBlurClose, useOpenClose} from "../../../shared";
import {useTranslation} from "react-i18next";
import s from './Employee.module.scss'
import {useNavigate} from "react-router-dom";
import {UserAvatar} from "../../user";
import {OverLapElsWrapper} from "../../../shared/ui/OverLapElWrapper/OverLapElsWrapper";
import {ProjectInfoEl} from "../../project";
import {InviteFriendButton} from "../../../features/project/inviteNewMember";

interface IUser {
    id: number
    first_name: string
    last_name: string
    avatar: string | null
}

interface EmployeesOnProjectCardProps {
    employees: IUser[]
    ownerId: number
    canInvite: boolean
    projectId: number
    loading: boolean
}

export const EmployeesOnProjectCard: FC<EmployeesOnProjectCardProps> = ({
                                                                       employees,
                                                                       loading,
                                                                       ownerId,
                                                                       canInvite,
                                                                       projectId
                                                                   }) => {
    const {t} = useTranslation()
    const [isListOpen, open, close] = useOpenClose()
    const closeList = () => {
        close()
        closeInviteForm()
    }
    const {onBlur, onFocus, ref} = useOnBlurClose(closeList, isListOpen)
    const n = useNavigate()

    const handleCardClick = () => {
        open()
    }
    const countOfVisibleAvatars = 4

    const lessElsCount = Math.max(employees.length - countOfVisibleAvatars, 0)
    const [isInviteFormOpen, openForm, closeInviteForm] = useOpenClose()
    const openInviteForm = () => {
        openForm()
        ref.current?.focus()
    }
    return <div className={s.employees_on_project} onClick={handleCardClick}>
        <ProjectInfoEl title={'together'}
                       loading={loading}
        >
            <div className={s.avatars_block}>
                <OverLapElsWrapper>
                    {
                        employees.slice(0, countOfVisibleAvatars).map(e => <UserAvatar type={'small'}
                                                                                       avatar={e.avatar}
                                                                                       key={e.id}
                                                                                       withBorder
                        />)
                    }
                </OverLapElsWrapper>
                {lessElsCount > 0 && <span>
                   +{lessElsCount}
               </span>}
            </div>
        </ProjectInfoEl>

        {isListOpen && <div className={s.full_list}
                            tabIndex={0}
                            onBlur={onBlur}
                            onFocus={onFocus}
                            ref={ref}
        >
            {
                employees.length > 0 && !isInviteFormOpen &&
                <div className={s.list}>
                    {
                        employees.map(e => <div className={s.employee}
                                                key={e.id}
                                                onClick={() => n(`/profile/${e.id}`)}
                        >
                            <div className={s.name}>
                                <Title type={5} message={`${e.first_name} ${e.last_name}`}/>
                                {ownerId === e.id && <Title type={6}
                                                            message={t("project.owner")}
                                                            color={'secondary'}/>}
                            </div>
                            <div className={s.avatar}>
                                <UserAvatar type={'small'} avatar={e.avatar}/>
                            </div>
                        </div>)
                    }
                </div>
            }

            {canInvite && <InviteFriendButton open={openInviteForm}
                                              close={closeInviteForm}
                                              isOpen={isInviteFormOpen}
                                              projectId={projectId}
                                              userId={ownerId}
            />}
        </div>}
    </div>
}