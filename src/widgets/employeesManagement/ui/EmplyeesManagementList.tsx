import {FC} from "react";
import {EmployeesManagementCard} from "./EmployeesManagementCard";
import {useGetEmployeesQuery} from "../../../entities/employee/api/employeesAPI";
import {useError} from "../../../shared";
import s from './EmployeesManagement.module.scss'


export const EmployeesManagementList: FC = () => {
    const {data: employees,isLoading, error} = useGetEmployeesQuery()
    useError(error)
    return <div className={s.list}>
        {
            isLoading
                ? Array.apply(null, new Array(5)).map((_, i) => <EmployeesManagementCard loading key={i}/>)
                : employees && employees.map(e => <EmployeesManagementCard key={e.id}
                                                                           data={{name: `${e.last_name} ${e.first_name}`,
                                                                               isAdmin: false, id: e.id}}
            />)
        }

    </div>
}