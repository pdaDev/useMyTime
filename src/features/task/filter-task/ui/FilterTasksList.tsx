import {FC} from "react";
import s from './FilterTasksList.module.scss'
import {useTranslation} from "react-i18next";

interface FilterTasksListProps {
    filters: { title: string, group: number[] }[]
    activeFilters: string[]
    setFilterBy: (filter: any[]) => void
}

export const FilterTasksList: FC<FilterTasksListProps> = ({ filters, activeFilters, setFilterBy}) => {
    const { t } = useTranslation()

    const setFilter = (filter: {title: string, group: number[]}) => {
        if (activeFilters.includes(filter.title)) {
            setFilterBy(activeFilters.filter((f => f !== filter.title)))
        } else {
            const newActive = activeFilters.filter(f => !filters.find(flt => flt.title === f)!.group.some(x => filter.group.includes(x)))
            setFilterBy([...newActive, filter.title])
        }
    }
    return <div className={s.filter_list}>
        {
            filters.map(filter => <div className={`${s.filter} ${activeFilters.includes(filter.title) && s.active}`}
                                       onClick={() => setFilter(filter)}
            >
                {t(`project.tasks.${filter.title}`)}
            </div>)
        }
    </div>
}