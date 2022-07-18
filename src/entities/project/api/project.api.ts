import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IProjectList} from "../lib/projec.types";
import {getToken} from "../../user";


interface TasksResponse {
    results: Array<ITask>
    count: number
}

interface ITask {
    id: number
    name: string
    description: string
    deadline: string
    project: number
    assignee: number
}

interface IProject {
    id: number
    name: string
    description: string
    deadline: string
    priority: number
    users: any
}

export const ProjectApi = createApi({
    reducerPath: 'project',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://use-my-time-demo.herokuapp.com/api/',
        prepareHeaders: (headers) => {
            const token = getToken()
            headers.set('Authorization', `Token ${token}`)
            return headers
        }
    }),
    tagTypes: ['project', 'task', 'tasks'],
    endpoints: build => ({
        getProjects: build.query<IProjectList, { limit: number, page: number }>({
            query: ({limit, page}) => ({
                url: 'projects_of_current_user/',
                params: {
                    limit: limit,
                    offset: page
                }
            })
        }),
        getProject: build.query<IProject, number>({
            query: (id: number) => `projects/${id}`,
            providesTags: ['project']
        }),
        getTasks: build.query<TasksResponse, { limit: number, page: number, id: number }>({
            query: ({limit, page, id}) => ({
                url: `tasks_of_project/${id}`,
                params: {
                    limit: limit,
                    offset: page
                }
            }),
            providesTags: ['tasks']
        }),
        changeProjectDescription: build.mutation<void, { id: number, description: string }>({
            query: ({id, description}) => ({
                url: `project/${id}`,
                method: 'PATCH',
                body: {
                    description
                }
            }),
            invalidatesTags: ['project']
        }),
        createProject: build.mutation<void, Omit<IProject, 'id'>>({
            query: (project) => ({
                url: 'create_project/',
                method: 'POST',
                body: project
            })
        }),
        createTask: build.mutation<void, ITask>({
            query: (task) => ({
                url: 'add_task_to_project',
                method: 'POST',
                body: task
            }),
            invalidatesTags: ['tasks']
        }),
        getProjectAnalyze: build.query({
            query: () => ''
        }),
        deleteProject: build.mutation<void, number>({
            query: id => ({
                url: `project/${id}`,
                method: 'DELETE'
            })
        }),
        deleteTask: build.mutation<void, number>({
            query: id => ({
                url: `task/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['tasks']
        })
    })

})

export const {
    useGetProjectsQuery,
    useGetProjectQuery,
    useGetProjectAnalyzeQuery,
    useGetTasksQuery,
    useChangeProjectDescriptionMutation,
    useCreateProjectMutation,
    useCreateTaskMutation,
    useDeleteProjectMutation,
    useDeleteTaskMutation
} = ProjectApi