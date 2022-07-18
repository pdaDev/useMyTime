import {FC} from "react";
import {useParams} from "react-router-dom";
import {ProjectInfoBlock} from "../../../widgets/projectInfo";
import {TasksBlock} from "../../../widgets/tasksBlock";

export const Project: FC = () => {
    const id = useParams()
    return <>
        <ProjectInfoBlock id={id as any}/>
        <TasksBlock projectId={id as any}/>
    </>
}