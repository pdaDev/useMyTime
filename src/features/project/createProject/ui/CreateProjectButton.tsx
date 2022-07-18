import {FC} from "react";
import {CreateElWrapper, Form} from "shared";
import {CreateProjectForm} from "./CreatepProject";


export const CreateProjectButton: FC = () => {
    return <CreateElWrapper createFormRender={(close: () => void) => <CreateProjectForm close={close}/>}
                            createButtonRender={(create: () => void) => <Form.AddButton handleClick={create} floating size={'large'}/>}
    />
}