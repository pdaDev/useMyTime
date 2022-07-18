import {FC} from "react";
import { Title } from "shared";
import s from './Program.module.scss'

export interface IProgram {
    title: string
    id: number
    active: boolean
}

export interface IProgramCard {
    data?: IProgram
    loading?: boolean
}

export const ProgramCard: FC<IProgramCard> = ({data, loading}) => {
    return <div className={s.program_card}
                data-active={data?.active}
                data-loading={loading}
    >
        <Title type={5} message={data?.title}/>
    </div>
}