import {FC} from "react";
import s from './ProgramBlock.module.scss'
import {ProgramList} from "../../../entities/program";
import {CreateElWrapper, Form} from "shared";
import {ChooseProgramForm} from "../../../features/rpogram/choose-programm";

export const ProgramsBlock: FC = () => {
    const AddProgramButton = () => <CreateElWrapper createFormRender={(close: () => void) => <ChooseProgramForm close={close} />}
                                              createButtonRender={(create: () => void) => <Form.AddButton handleClick={create}/>}/>
    return <div className={s.programs_block}>
        <ProgramList renderAddButton={AddProgramButton}
        />
    </div>
}