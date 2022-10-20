export interface IProjectListEl {
    name: string
    id: number
    priority: number
    time: string
    end_date: string
}

export interface IProjectList {
    results: IProjectListEl[]
    count: number
}