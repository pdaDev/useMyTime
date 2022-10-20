import {ProgramCard} from "entities/program";
import {IProgramCard} from "entities/program/ui/ProgramCard";
import {FC} from "react";
import s from './ActiveProgram.module.scss'
import {useDispatch} from "react-redux";
import {addActiveProgram, removeActiveProgram} from "entities/timer";

export const ActiveProgramItem: FC<IProgramCard["data"]> = (props) => {
    const d = useDispatch()
    const isActive = props?.active
    const toggleActive = () => {
        isActive ? d(removeActiveProgram(props!.id)) : d(addActiveProgram(props!.id))
    }
    return <div onClick={toggleActive} className={s.active_program_wrapper}>
        <ProgramCard data={props}/>
    </div>
}