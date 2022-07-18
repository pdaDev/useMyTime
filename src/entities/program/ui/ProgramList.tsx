import {FC, ReactNode} from "react";
import s from './Program.module.scss'

interface ProgramListProps {
    renderAddButton: () => ReactNode
}

export const ProgramList: FC<ProgramListProps> = ({renderAddButton}) => {
    return <div className={s.programs_list}>
        {renderAddButton()}
    </div>
}