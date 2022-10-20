import {EmployeeManagementCard as Card} from "../../../entities/employee";
import {FC} from "react";
import {ToggleAdminStatus} from "features/employee/toggleAdmintManagerStatus";
import {useMakeUserAdminMutation} from "../../../entities/employee/api/employeesAPI";
import {useNotify} from "../../../shared";
import {useNavigate} from "react-router-dom";

interface EmployeesManagementCardProps {
    data?: {
        name: string
        isAdmin: boolean
        id: number
    }
    loading?: boolean
}


export const EmployeesManagementCard: FC<EmployeesManagementCardProps> = ({loading,data}) => {
    const [makeAdmin, {isError}] = useMakeUserAdminMutation()
    useNotify(isError, 'Ошибка! Повторите попытку позже!', 'error')
    const n = useNavigate();

    if (loading) {
        return <Card loading/>
    }

    const goToEmployeeProfile = () => data && n(`/profile/${data.id}/`)

    const giveAdminStatus = async () => {
        await makeAdmin(data!.id).unwrap()
    }
    const cardData = {name: data!.name}
    return <div onClick={goToEmployeeProfile}>
        <Card data={cardData}
              renderAdminButton={() => <ToggleAdminStatus isAdmin={data!.isAdmin} handleClick={giveAdminStatus}/>}
        />
    </div>
}