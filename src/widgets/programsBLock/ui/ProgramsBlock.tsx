import {FC} from "react";
import s from './ProgramBlock.module.scss'
import {ProgramsList} from "./ProgramsList";
import {CreateElWrapper, Form} from "shared";
import {ChooseProgramForm} from "../../../features/rpogram/choose-programm";

interface ProgramsBlockProps {
    projectId: number
}

export const ProgramsBlock: FC<ProgramsBlockProps & Parameters<typeof ProgramsList>[0]> = ({projectId, ...props}) => {
    const AddProgramButton = () => <CreateElWrapper
        createFormRender={(close: () => void) => <ChooseProgramForm close={close} projectId={projectId}/>}
        createButtonRender={(create: () => void) => <Form.AddButton handleClick={create}/>}/>
    return <div className={s.programs_block}>
        <ProgramsList  {...props}/>
        <AddProgramButton/>
    </div>
}