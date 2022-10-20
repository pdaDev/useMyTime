import {FC, useMemo} from "react";
import s from './Paginator.module.scss'
import {ArrowIcon} from "../Icons";
import Select from "react-select";
import './PaginatorSelect.scss'

interface IPaginator {
    currentPage: number
    countOfPages: number
    setPage: (page: number) => void

}

export const Paginator: FC<IPaginator> = ({currentPage, setPage, countOfPages}) => {

    const maxCountVisibleEls = 5
    const isNextButtonDisabled = currentPage === countOfPages
    const isPrevButtonDisabled = currentPage === 1
    const isShowLeftDots = currentPage > 5
    const isShowRightDots = currentPage + maxCountVisibleEls <= countOfPages

    const setNextPage = () => setPage(currentPage + 1)
    const setPrevPage = () => setPage(currentPage - 1)
    const setFirstPage = () => setPage(1)
    const setLastPage = () => setPage(countOfPages)

    const options = useMemo(() => {
        console.log(countOfPages)
       return  Array.apply(null, new Array(countOfPages)).map((_, i) => ({
           value: (i + 1).toString(),
           label: (i + 1).toString()
       }))
    }, [countOfPages])
    const countOfGroupPages = Math.min(maxCountVisibleEls - 2 , countOfPages - 2 )
    const onChange = (newValue: any) => {
        setPage(+newValue.value)
    }
    const getValue = (value: string) => {
        return options.find(option => option.value === value)
    }
    const groupPageStart = isShowRightDots
        ? Math.max(2, Math.ceil(currentPage - (maxCountVisibleEls - 3) / 2))
        : Math.max(countOfPages - 1 - countOfGroupPages, 2)

    return (
        <div className={s.paginator}>
            <>
                <button disabled={isPrevButtonDisabled}
                        onClick={setPrevPage}
                >
                    <img src={ArrowIcon} alt={'left arrow'}/>
                </button>
                <div className={s.page}
                     onClick={setFirstPage}
                     data-active={currentPage === 1}
                >
                    1
                </div>
                {isShowLeftDots && <div className={s.three_dots}>...</div>}
                {Array.apply(null, new Array(countOfGroupPages))
                    .map((_, i) => <div className={s.page}
                                        data-active={currentPage === groupPageStart + i}
                                        onClick={() => setPage(groupPageStart  + i )}
                    >
                        {groupPageStart + i}
                    </div>)}
                {isShowRightDots && <div className={s.three_dots}>...</div>}
                <div className={s.page}
                     data-active={currentPage === countOfPages  }
                     onClick={setLastPage}
                >
                    { countOfPages }
                </div>
                <button disabled={isNextButtonDisabled}
                        onClick={setNextPage}
                        className={s.right_button}
                >
                    <img src={ArrowIcon} alt={'right arrow'}/>
                </button>

                <Select value={getValue(currentPage.toString())}
                        options={options as any}
                        isSearchable={true}
                        classNamePrefix={'paginator-select'}
                        onChange={onChange}
                        menuPlacement={'top'}

                />
            </>
        </div>
    )
}