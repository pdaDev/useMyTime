import {FC, ReactNode} from "react";
import s from './Employee.module.scss'
import {Title} from "shared";


interface EmployeeManagementCardProps {
    data?: {
        name: string
    }
    renderAdminButton?: () => ReactNode
    loading?: boolean
}

export const EmployeeManagementCard: FC<EmployeeManagementCardProps> = ({
                                                                            data,
                                                                            loading,

                                                                            renderAdminButton
                                                                        }) => {
    return <div className={s.employee_management_card}>
        <Title type={3} message={data?.name}/>
        <div className={s.buttons_block}>
            <div className={s.button} data-loading={loading}>
                {!loading && renderAdminButton && renderAdminButton()}
            </div>
        </div>

    </div>
}