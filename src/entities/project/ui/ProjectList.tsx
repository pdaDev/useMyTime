import {FC} from "react";
import {Layout, List, useOptionsFromArray} from "shared";
import {useGetProjectsQuery} from "../api/project.api";
import 'i8next'
import {useSelector} from "react-redux";
import {getState} from "../model/project.selectors";
import {appUseDispatch} from "app/store";
import {setPage, setSortBy, typesOfSorting} from "../model/project.slice";
import {ProjectCard} from "./ProjectCard";
import { useTranslation } from "react-i18next";
import {CreateProjectButton} from "../../../features/project/createProject";


interface ProjectListProps {
}


export const ProjectList: FC<ProjectListProps> = () => {

    const { t } = useTranslation()
    const {limit, currentPage, sortBy} = useSelector(getState)
    const dispatch = appUseDispatch()
    const {data, isLoading} = useGetProjectsQuery({page: currentPage, limit})
    const setCurrentPage = (page: number) => dispatch(setPage(page))
    const setSort = (typeOfSort: string) => dispatch(setSortBy(typeOfSort))
    const options = useOptionsFromArray(typesOfSorting, 'projects')

    return <List limit={limit}
                 renderTitle={() => <Layout.PageTitle title={t("projects.title")}/>}
                 loading={isLoading}
                 currentPage={currentPage}
                 countOfPages={Math.ceil(data?.count || 1 / limit)}
                 setPage={setCurrentPage}
                 sortOptions={options}
                 items={data?.results}
                 selectSort={setSort}
                 createButtonRender={() =>  <CreateProjectButton/>}
                 currentSortBy={sortBy}
                 ItemEl={ProjectCard as any}
    />
}