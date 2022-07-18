import {FC, useState} from "react";
import {List, useOptionsFromArray} from "shared";
import s from './TasksBlock.module.scss'
import {TaskCard} from "../../../entities/task";
import {useGetTasksQuery} from "../../../entities/project";

interface TasksBlockWrapperProps {
    projectId: number
}

export const TasksBlock: FC<TasksBlockWrapperProps> = ({projectId}) => {
    const [ currentPage, setPage ] = useState(1)
    const [ limit ] = useState(10)
    const {  data, isFetching } = useGetTasksQuery({limit, id: projectId, page: currentPage})
    const typesOfSorting: string[] = ['deadline', 'name']
    const options = useOptionsFromArray(typesOfSorting, 'projects')
    const countOfPages = Math.ceil((data?.count || 0) / limit)
    const [sortBy, setSortBy] = useState<string>(typesOfSorting[0])
    return  <div className={s.task_block_wrapper}>
        <List currentPage={currentPage}
              limit={limit}
              loading={isFetching}
              setPage={setPage}
              countOfPages={countOfPages}
              ItemEl={TaskCard as any}
              currentSortBy={sortBy}
              items={data?.results}
              selectSort={setSortBy}
              sortOptions={options}
        />
    </div>
}