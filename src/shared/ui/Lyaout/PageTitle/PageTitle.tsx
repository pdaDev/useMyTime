import {FC} from "react";
import {Title} from "../../Title/Title";
import s from './PageTitle.module.scss'

interface IPageTitle {
    title: string
}

// @ts-ignore
export const PageTitle: FC<IPageTitle> = ({title}) => {
    return <div className={s.page_title_wrapper}>
        <Title type={1} message={title}/>
    </div>
}