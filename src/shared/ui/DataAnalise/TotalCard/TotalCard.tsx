import {FC} from "react";
import s from './TotalCard.module.scss'
import {Title} from "../../Title/Title";

interface ITotalCard{
    title: string | null | undefined
    totalValue: number | null | undefined
    measure: string | null | undefined
    loading?: false

}

export const TotalCard: FC<ITotalCard> = (
    {
        totalValue,
        title,
        measure,
        loading
    }
) => {
    const loadingStatus = (!title || !totalValue || !measure) || loading
    return <div className={s.total_card}>
        <Title type={3} message={title || ''} loading={loadingStatus}/>
        <div className={s.data}>
            <Title type={3} message={totalValue?.toString() || ''} size={72} color={'main'}/>
            <Title type={3} message={measure || ''} size={42} color={'secondary'}/>
        </div>
    </div>
}