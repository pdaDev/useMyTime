import {FC, useMemo, useState} from "react";
import {Form, sortDate, sortText, Title, useOptionsFromArray} from "shared";
import s from './TasksBlock.module.scss'
import {TaskCard} from "./TaskCard";
import {useTranslation} from "react-i18next";
import {CreateTaskButton} from "../../../features/task/create-task";
import {useDispatch, useSelector} from "react-redux";
import {FilterTasksList} from "../../../features/task/filter-task/ui/FilterTasksList";
import {UserSelectors} from 'entities/user'
import {setActiveTask as reduxSetActiveTask, TimerSelectors} from 'entities/timer'

interface TasksBlockWrapperProps {
    loading: boolean
    tasks: ITask[] | undefined
    projectId: number
    projectOwner: number
    activeTask: number | null
    setActiveTask: (task: number | null) => void
}

interface ITask {
    name: string
    fulfilled: boolean
    id: number
    deadline: string
    assignee: number
}

export const TasksBlock: FC<TasksBlockWrapperProps> = ({

                                                           loading,
                                                           tasks,
                                                           projectId,
                                                           projectOwner,
                                                           activeTask, setActiveTask
                                                       }) => {

    const {t} = useTranslation()

    const typesOfSorting = ['end_time', 'name'] as const
    const selectedProject = useSelector(TimerSelectors.getActiveProject)
    const reduxActiveTask = useSelector(TimerSelectors.getActiveTask)
    const userId = useSelector(UserSelectors.getId)
    const userIsProjectOwner = projectOwner === userId
    const filters = [{
        title: 'all',
        group: [1, 2]
    }, {
        title: 'my',
        group: [1]
    }, {
        title: 'fulfilled',
        group: [2]
    }, {
        title: 'not_fulfilled',
        group: [2]
    }] as const

    type filtersTypes = typeof filters[number]["title"]

    const options = useOptionsFromArray(typesOfSorting as any, 'projects')
    const [sortBy, setSortBy] = useState<typeof typesOfSorting[number]>(typesOfSorting[0])
    const [filterBy, setFilterBy] = useState<Array<Partial<filtersTypes>>>(['all'])

    const tasksWithActiveStatus = useMemo(
        () => {
            return filterBy.reduce((filteredtasks, f) => filteredtasks?.filter(task => {
                switch (f) {
                    case "all":
                        return true
                    case 'fulfilled':
                        return task.fulfilled
                    case 'not_fulfilled':
                        return !task.fulfilled
                    case 'my':
                        return task.assignee === userId
                    default:
                        return true
                }
            }), tasks)?.sort((a: any, b: any) => {
                switch (sortBy) {
                    case "name":
                        return sortText(a.name, b.name, false)
                    case 'end_time':
                        return sortDate(new Date(a.deadline), new Date(b.deadline), false)
                    default:
                        return sortText(a.name, b.name, false)
                }
            })
        }
        , [tasks, filterBy, sortBy, userId])
    const d = useDispatch()

    const isSelectedProject = +projectId === selectedProject
    const activeTaskId = isSelectedProject ? reduxActiveTask : activeTask
    const setActiveTaskId = (taskId: number) => {
        const newActive = taskId === activeTaskId ? null : taskId
        isSelectedProject ? d(reduxSetActiveTask(newActive)) : setActiveTask(newActive)
    }
    return <div className={s.task_block_wrapper}>

        <div className={s.title_block}>
            <div className={s.title_wrapper}>
                <Title type={2} message={t("project.tasks.title")}/>
            </div>
            <FilterTasksList filters={filters as any}
                             activeFilters={filterBy as any}
                             setFilterBy={setFilterBy as any}

            />
        </div>
        <div className={s.sort}>
            <Title type={3}
                   message={t("projects.sortBy")}
            />
            <Form.SelectInput type={'primary'}
                              options={options}
                              selectedValue={sortBy}
                              selectValue={setSortBy as any}
            />
        </div>

        {
            loading
            && Array.apply(null, new Array(5)).map(() => <TaskCard loading={true} active={false}/>)
        }
        {tasksWithActiveStatus && tasksWithActiveStatus.length === 0 && <div className={s.nothing_found}>
            <Title type={3}
                   message={t("app.empty")}
                   color={'secondary'}
            />
        </div>}
        {tasksWithActiveStatus && tasksWithActiveStatus.map(item => <span key={item.id}
                                                                          onClick={() => setActiveTaskId(item.id)}>
            <TaskCard data={item as any}
                      active={item.id === activeTaskId}
                      canInteract={userIsProjectOwner || item.assignee === userId}
            />
        </span>)}
        {
            <div className={s.create_button}>
                <CreateTaskButton id={projectId}/>
            </div>

        }
    </div>
}