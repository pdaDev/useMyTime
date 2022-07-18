import {FC} from "react";
import s from 'Employee.module.scss'
import {Title} from "../../../shared";


interface IEmployee {
    id: number,
    name: string
    post: string
    dep: string
}

interface EmployeeCardProps {
    data?: IEmployee
    loading?: boolean
}

export const EmployeeCard: FC<EmployeeCardProps> = ({loading, data}) => {
    return <div className={s.employee_card}>
        <Title type={3} message={data?.name} loading={loading}/>
        <Title type={3} message={data?.dep}/>
        <Title type={3} message={data?.post}/>
    </div>
}