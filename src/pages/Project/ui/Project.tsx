import {FC, useEffect, useMemo, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {ProjectInfoBlock} from "../../../widgets/projectInfo";
import {TasksBlock} from "../../../widgets/tasksBlock";
import {useError} from "../../../shared";
import {UserSelectors} from 'entities/user'
import {
    useGetDirectionTypeOfProjectsQuery,
    useGetProjectQuery,
    useGetProjectTimeForTodayQuery,
    useGetTasksQuery,
    useGetTotaltimeForAllTaskForTodayQuery,
    useGetTotalTimeForProjectQuery,
    useGetTotalTimesFor2WeeksQuery,
    useGetTypesOfProjectQuery,
    useGetUserMetaDataMutation,
    useGetWokrPeriodsForTodayQuery
} from "../../../entities/project";
import {TImerBlock} from "../../../widgets/timerBlock";
import {useSelector} from "react-redux";
import {ProjectAnalyseBlock} from "../../../widgets/prpjectAnalyseBlock/ui/ProjectAnalyseBlock";

export const Project: FC = () => {
    const {id} = useParams() as any
    const init = useRef(false)

    const {
        data: projectData,
        isLoading: getProjectDataLoading,
        error: getProjectError
    } = useGetProjectQuery(id)
    const {data: projectTypes, isLoading: typesLoading, error: getTypesError} = useGetTypesOfProjectQuery()

    const {
        data: directionTypes,
        isLoading: directionTypesLoading,
        error: getDirectionTypesError
    } = useGetDirectionTypeOfProjectsQuery()

    const {data: tasks, isLoading: getTasksLoading} = useGetTasksQuery(id)
    const {
        data: projectTimeToday,
        isLoading: projectTimeTodayLoading,
    } = useGetProjectTimeForTodayQuery(+id)
    const [getMetaUsers, {
        data: employees,
        isLoading: getEmployeesMetaLoading,
        error: getEmployeesError
    }] = useGetUserMetaDataMutation()

    const {
        data: statFor2weeks,
        isLoading: statFor2weeksLoading,
        error: statFor2WeekError
    } = useGetTotalTimesFor2WeeksQuery(+id)
    const {
        isLoading: totalTimeForAllTasksLoading,
    } = useGetTotaltimeForAllTaskForTodayQuery(+id)
    const {
        isLoading: todayWorkPeriodsLoading,
    } = useGetWokrPeriodsForTodayQuery(+id)
    const {
        data: totalTime,
        isLoading: totalTimeLoading,
        error: totalTimeError
    } = useGetTotalTimeForProjectQuery(+id)

    const tasksWithoutAnonymous = useMemo(() => {
       return  tasks?.filter(task => task.name !== 'Anonymous Task') || []
    }, [tasks])
    useEffect(() => {
        if (projectData) {
            getMetaUsers([projectData.owner, ...projectData.users])
        }
    }, [projectData, getMetaUsers])
    const getAllDataLoading =
        getProjectDataLoading
        || totalTimeLoading
        || totalTimeForAllTasksLoading
        || todayWorkPeriodsLoading
        || typesLoading
        || directionTypesLoading
        || getTasksLoading
        || statFor2weeksLoading
        || getEmployeesMetaLoading
        || projectTimeTodayLoading

    useEffect(() => {
        if (!getAllDataLoading) {
            init.current = true
        }
    }, [getAllDataLoading])

    const loading = init.current ? false : getAllDataLoading
    useError([getProjectError, getTypesError,
        getDirectionTypesError, getEmployeesError,
        totalTimeError, statFor2WeekError
    ])
    const userId = useSelector(UserSelectors.getId)
    const isMember = projectData?.users.includes(userId) || false
    const isOwner = userId === projectData?.owner

    const [activeTask, setActiveTask] = useState<number | null>(null)
    useEffect(() => {
        setActiveTask(null)
    }, [id])
    return <>
        <ProjectInfoBlock id={id as any}
                          data={projectData}
                          projectTypes={projectTypes}
                          loading={loading}
                          employees={employees as any}
                          isOwner={isOwner}
                          isMember={isMember}
                          directionTypes={directionTypes}
        >
            <TImerBlock tasks={tasksWithoutAnonymous}
                        projectId={+id}
                        activeTask={activeTask}
                        loading={loading}
                        projectTimeToday={projectTimeToday}
            />
        </ProjectInfoBlock>

        <TasksBlock projectId={id as any}
                    tasks={tasksWithoutAnonymous}
                    loading={loading}
                    activeTask={activeTask}
                    setActiveTask={setActiveTask}
                    projectOwner={projectData?.owner || 0}
        />
        <ProjectAnalyseBlock tasks={tasks as any}
                             projectId={id as any}
                             loading={loading}
                             totalTime={totalTime || 0}
                             tasksWithoutAnonymous={tasksWithoutAnonymous}
                             gistogramData={statFor2weeks || []}
                             projectTimeToday={projectTimeToday}
        />
    </>
}