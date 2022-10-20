import {FC} from "react";
import {TaskCard as Card} from "../../../entities/task";
import {DeleteTaskButton, SubmitTaskButton} from "../../../features/task/interact-with-task";
import {useOpenClose} from "../../../shared";
import {EditTaskButton, EditTaskForm} from "../../../features/task/edit-tasl";
import s from './TasksBlock.module.scss'

type TaskCardProps = Omit<Parameters<typeof Card>[0], 'renderDeleteButton' |'renderSubmitButton' | 'renderEditButtton'>

export const TaskCard: FC<TaskCardProps> = ({loading, data, canInteract, active }) => {
    const [isEditFormOpen, openForm, closeForm] = useOpenClose()

    const editTask = () => {
        !loading && openForm()
    }
    return <>
        <div             className={s.task_card_wrapper}
        >
            <Card renderDeleteButton={() => <DeleteTaskButton id={data?.id!}/>}
                  loading={loading}
                  active={active}
                  data={data}
                  canInteract={canInteract}
                  renderSubmitButton={() => <SubmitTaskButton fulfilled={loading ? false : data!.fulfilled} id={!loading ? data!.id : 0}/>}
                  renderEditButtton={() =>  <EditTaskButton open={editTask}/>}
            />
        </div>

        {
            isEditFormOpen && <EditTaskForm id={data?.id!}
                                            close={closeForm}
                                            values={data!}
            />
        }
    </>
}