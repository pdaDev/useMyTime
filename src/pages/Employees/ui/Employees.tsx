import {FC} from "react";
import {useManagerRedirect} from "../lib/hooks";
import {EmployeesManagementList} from "widgets/employeesManagement";


export const Employees: FC = () => {
    useManagerRedirect()
    return <>
        <EmployeesManagementList/>
    </>
}