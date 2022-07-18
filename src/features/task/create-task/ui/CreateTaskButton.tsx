import {FC} from "react";
import {CreateElWrapper, Form} from "shared";
import {CreateTaskForm} from "./CreateTaskForm";


export const CreateTaskButton: FC = () => {
    return <CreateElWrapper createFormRender={(close: () => void) => <CreateTaskForm close={close}/>}
                           createButtonRender={(create: () => void) => <Form.AddButton handleClick={create} floating/>}
    />
}