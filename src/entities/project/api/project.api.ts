import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IProjectList} from "../lib/projec.types";
import {getToken} from "../../user";


interface ITask {
    id: number
    name: string
    description: string
    deadline: string
    fulfilled: boolean
    project: number
    assignee: number
}

interface IProject {
    id: number
    name: string
    description: string
    start_date: string
    end_date: string
    order: string | null
    type: number
    direction_type: number
    priority: number
    users: number[]
    owner: number
}

interface IProjectCreate {
    name: string
    description: string
    start_date: string
    end_date: string
    order: string | null
    type: number
    direction_type: number
    priority: number
}

interface IProjectType {
    id: number
    abbreviation: string
    explanation: string
}


export const ProjectApi = createApi({
    reducerPath: 'project',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://use-my-time-demo.herokuapp.com/',
        prepareHeaders: (headers) => {
            const token = getToken()
            headers.set('Authorization', `Token ${token}`)
            return headers
        }
    }),
    tagTypes: ['project', 'task', 'tasks', 'programs'],
    endpoints: build => ({
        getProjects: build.query<IProjectList, { limit: number, page: number, sortBy: string }>({
            query: ({limit, page, sortBy}) => ({
                url: 'project/projects_of_current_user/',
                params: {
                    limit: limit,
                    offset: (page - 1) * limit,
                    filter_by: sortBy
                }
            })
        }),
        getProject: build.query<IProject, number>({
            query: (id: number) => `project/project/${id}/`,
            providesTags: ['project']
        }),
        getDirectionTypeOfProjects: build.query<Array<IProjectType>, void>({
            query: () => ({
                url: `project_properties/direction_types_of_projects/`,
                params: {
                    limit: 20,
                    offset: 1
                }
            }),
        }),
        deleteDirectionTypeOfProject: build.mutation<void, number>({
            query: (id) => ({
                url: `project_properties/direction_type_of_projects/${id}/`,
                method: 'DELETE'
            })
        }),
        createDirectionTypeOfProject: build.mutation<void, Omit<IProject, 'id'>>({
            query: (body) => ({
                url: `project_properties/direction_types_of_projects/`,
                method: 'POST',
                body

            })
        }),
        patchDirectionTypeOfProject: build.mutation<void, { id: number, body: Omit<IProjectType, 'id'> }>({
            query: ({id, body}) => ({
                url: `project_properties/direction_type_of_projects/${id}/`,
                method: "PUT",
                body
            })
        }),
        getTypesOfProject: build.query<Array<IProjectType>, void>({
            query: () => ({
                url: 'project_properties/types_of_projects/',
                params: {
                    limit: 20,
                    offset: 0
                }
            }),
        }),
        deleteTypeOfProject: build.mutation<void, number>({
            query: (id) => ({
                url: `project_properties/type_of_projects/${id}/`,
                method: 'DELETE'
            })
        }),
        createTypeOfProject: build.mutation<void, Omit<IProjectType, 'id'>>({
            query: (body) => ({
                url: 'project_properties/types_of_projects/',
                method: 'POST',
                body
            })
        }),
        patchTypeOfProject: build.mutation<void, { id: number, body: Omit<IProject, 'id'> }>({
            query: ({id, body}) => ({
                url: `project_properties/type_of_projects/${id}/`,
                method: "PUT",
                body
            })
        }),

        getTasks: build.query<Array<ITask>, number>({
            query: (id) => ({
                url: `project/tasks_of_project/${id}/`,
            }),
            providesTags: ['tasks']
        }),
        patchProject: build.mutation<void, Partial<IProject>>({
            query: ({id, ...body}) => ({
                url: `project/project/${id}/`,
                method:  'PATCH',
                body
            }),
            invalidatesTags: ['project']
        }),
        createProject: build.mutation<{ id: number }, IProjectCreate>({
            query: (project) => ({
                url: 'project/create_project/',
                method: 'POST',
                body: project
            })
        }),
        createTask: build.mutation<void, Omit<ITask, "id">>({
            query: (body) => ({
                url: 'project/add_task_to_project/',
                method: 'POST',
                body
            }),
            invalidatesTags: ['tasks']
        }),

        getProjectAnalyze: build.query({
            query: () => ''
        }),
        deleteProject: build.mutation<void, number>({
            query: id => ({
                url: `project/project/${id}/`,
                method: 'DELETE'
            })
        }),
        deleteTask: build.mutation<void, number>({
            query: id => ({
                url: `project/task/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['tasks']
        }),
        patchTask: build.mutation<void, Partial<ITask>>({
            query: ({id, ...body}) => ({
                url: `project/task/${id}/`,
                method: 'PATCH',
                body
            })
            ,invalidatesTags: ['tasks']
        }),
        getProgramsForProject: build.query<Array<IProgram>, number>({
            query: id => `project/${id}/programs/`,
        }),
        getAllPrograms: build.query<Array<IProgram>, void>({
            query: () => `programs`,
            providesTags: ['programs']
        }),
        setNewProgram: build.mutation<void, string>({
            query: name => ({
                url: 'programs',
                method: 'POST',
                body: {
                    name
                }
            }),
        }),
        setProgramsForProject: build.mutation<void, { id: number, programs: Array<number> }>({
            query: ({id, programs}) => ({
                url: `project/${id}/programs/`,
                method: 'POST',
                body: {
                    programs
                }
            })
        }),
        deleteProgram: build.mutation<void, number>({
            query: (id) => ({
                url: `programs/${id}`,
                method: 'DELETE',
            })
        }),
        patchProgram: build.mutation<void, IProgram>({
            query: ({id, ...body}) => ({
                url: `programs/${id}`,
                method: "PATCH",
                body
            })
        }),
        inviteNewMember: build.mutation<void, string>({
            query: (email) => ({
                url: 'email/send_invite_to_email/',
                method: 'POST',
                body: {
                    email
                }
            })
        }),
        getTotalTimeForProject: build.query<number, number>({
            query: (id) => `timer/total_time_by_project/${id}/`,
            transformResponse(response: any) {
                return response['total time by project']
            }
        }),
        getUserMetaData: build.mutation<IUserMeta[], number[]>({
            query: (users) => ({
                url: 'user/preview_users_by_ids/',
                method: "POST",
                body: {
                    users: users
                }
            }),
            transformResponse(response: IUserMeta[]){
                return response.map(u => ({...u, avatar: null}))
            }
        }),
        getTimeForTask: build.query<number, number>(({
            query: (id) => `timer/total_time_by_task/${id}/`,
            transformResponse(response: any) {
                return response['total time by task']
            }
        })),
        getSessions: build.query<void, number>(({
            query: (id) => `timer/sessions_by_project/${id}`
        })),
        getProjectTimeForToday: build.query<void, number>(({
            query: (id) => `timer/timer_info_by_project_for_today/${id}`,
            transformResponse(response: any) {
                return response['total time by project for today']
            }
        })),
        addNewMemberToProject: build.mutation<void, {project_id: number, user_id: number}>({
            query: body => ({
                url: 'email/accept_the_invitation/',
                method: 'POST',
                body
            })
        }),
        getReport: build.mutation<IReport, {start: string, end: string}>({
            query: body => ({
                url: 'report/get_report_for_period/',
                method:'POST',
                body
            })
        }),
        getWokrPeriodsForToday: build.query<IWorkPeriod, number>({
            query: id => `/${id}/`
        }),
        getTotalTimesFor2Weeks: build.query<number[], number>({
            query: id => `/timer/project_statistics_for_last_two_weeks/${id}`
        }),
        getTotaltimeForAllTaskForToday: build.query<ITaskTotalTime[], number>({
            query: id => `/${id}/`,
            transformResponse(response: any) {
                return response
            }
        })

    })

})

interface ITaskTotalTime {
    taskId: number
}

interface IWorkPeriod {
    id: number
    start_time: string
    end_time: string
    task: number
}


interface IReport {
    [key: number]: IReportField
}
interface IReportField {
    department: string | null
    description: string
    direction_type: number | null
    employee: null | string
    hours: number
    order: string | null
    percents: number
    project_type: null | number
}
interface IUserMeta {
    id: number
    first_name: string
    last_name: string
    avatar: null | string
}

interface IProgram {
    id: number
    name: string
}

export const {
    useGetTotaltimeForAllTaskForTodayQuery,
    useGetWokrPeriodsForTodayQuery,
    useGetTotalTimesFor2WeeksQuery,
    useAddNewMemberToProjectMutation,
    useGetProjectsQuery,
    useGetProjectQuery,
    useGetProjectTimeForTodayQuery,
    useGetProjectAnalyzeQuery,
    useGetTasksQuery,
    usePatchProjectMutation,
    useCreateProjectMutation,
    useCreateTaskMutation,
    useGetReportMutation,
    useDeleteProjectMutation,
    useDeleteTaskMutation,
    useGetAllProgramsQuery,
    useGetProgramsForProjectQuery,
    useSetProgramsForProjectMutation,
    useSetNewProgramMutation,
    useGetTotalTimeForProjectQuery,
    usePatchTaskMutation,
    useGetDirectionTypeOfProjectsQuery,
    useGetTypesOfProjectQuery,
    useCreateDirectionTypeOfProjectMutation,
    useCreateTypeOfProjectMutation,
    useDeleteDirectionTypeOfProjectMutation,
    useDeleteTypeOfProjectMutation,
    usePatchTypeOfProjectMutation,
    usePatchDirectionTypeOfProjectMutation,
    useDeleteProgramMutation,
    usePatchProgramMutation,
    useInviteNewMemberMutation,
    useGetTimeForTaskQuery,
    useGetUserMetaDataMutation

} = ProjectApi