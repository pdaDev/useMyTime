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
    const loadingStatus = (!title || (totalValue === undefined || totalValue === null)  || !measure) || loading
    return <div className={s.total_card}>
        <Title type={3} message={title || ''} loading={loadingStatus}/>
      <div className={s.data_container}>
          <div className={s.data}>
              <Title type={4}
                     message={totalValue?.toString() || ''}
                     color={'main'}
                     loading={loadingStatus}
              />
              &nbsp;
              <Title type={4}
                     message={measure || ''}
                     color={'secondary'}
                     loading={loadingStatus}
              />
          </div>
      </div>
    </div>
}