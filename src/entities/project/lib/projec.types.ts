export interface IProjectListEl {
    name: string
    id: number
    priority: number
    time: string
}

export interface IProjectList {
    results: IProjectListEl[]
    count: number
}