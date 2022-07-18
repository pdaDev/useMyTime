import {FC, ReactNode} from "react";
import s from './List.module.scss'
import {Title} from "../Title/Title";
import {Paginator} from "../Paginator/Paginator";
import {Form} from 'shared'
import {useTranslation} from "react-i18next";
import {FCProp} from "../../lib/types";

interface ICard {
    data?: object
    loading?: boolean
}

interface ListProps {
    renderTitle?: () => ReactNode
    sortOptions: Array<{ value: string, label: string }>
    currentSortBy: string
    selectSort: (value: string) => void
    currentPage: number
    countOfPages: number
    items: any[] | undefined
    loading: boolean
    limit: number
    setPage: (page: number) => void
    createButtonRender?: () => ReactNode
    ItemEl: FC<ICard>
}

export const List: FCProp<ListProps> = ({
                                            sortOptions,
                                            currentSortBy,
                                            selectSort,
                                            renderTitle,
                                            currentPage = 1,
                                            countOfPages,
                                            createButtonRender,
                                            loading,
                                            setPage,
                                            ItemEl,
                                            items
                                        }) => {
    const {t} = useTranslation()
    console.log(items)
    return <div className={s.list}>

        <div className={s.title_block}>
            {renderTitle && renderTitle()}
            <div className={s.sort}>
                <Title type={3}
                       message={t("projects.sortBy")}
                />
                <Form.SelectInput type={'primary'}
                                  options={sortOptions}
                                  selectedValue={currentSortBy}
                                  selectValue={selectSort}
                />
            </div>

        </div>

        {
            loading
            && Array.apply(null, new Array(5)).map(() => <ItemEl loading={true}/>)
        }
        {items && items.length === 0 && <div className={s.nothing_found}>
            <Title type={3}
                   message={t("app.empty")}
                   color={'secondary'}
            />
        </div>}
        {items && items.map(item => <ItemEl key={item.id}
                                            data={item}/>)}
        {
            createButtonRender && <div className={s.create_button}>
                {createButtonRender()}
            </div>

        }
        {countOfPages > 1 && <Paginator currentPage={currentPage}
                                        countOfPages={countOfPages}
                                        setPage={setPage}
        />}
    </div>
}