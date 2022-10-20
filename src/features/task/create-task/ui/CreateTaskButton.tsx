import {FC} from "react";
import {CreateElWrapper, Form} from "shared";
import {CreateTaskBlock} from "./CreateTaskBlock";


export const CreateTaskButton: FC<{id: number}> = ({id}) => {
    return <CreateElWrapper createFormRender={(close: () => void) => <CreateTaskBlock close={close} id={id}/>}
                           createButtonRender={(create: () => void) => <Form.AddButton handleClick={create} floating/>}
    />
}