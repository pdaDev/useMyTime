import {FC} from "react";
import s from './Gistogram.module.scss'
import {Title} from "../../Title/Title";
import styled from "styled-components";

interface IGistogram {
    title: string
    values: Array<{
        x: number
        y: number
    }>
    countOfValues?: number
    countOfRows?: number
    deltaY?: number
    loading: boolean
    month: string

}

export const Gistogram: FC<IGistogram> = ({title, loading, deltaY, countOfRows = 4, month, values, countOfValues}) => {
    const maxValue = Math.max(...values.map(x => x.y))
    const count = countOfValues || values.length
    const delta = Math.max(deltaY || Math.ceil(maxValue / countOfRows), 1)
    const maxYLegendValue = delta * countOfRows;
    const yLegend = Array.apply(null, new Array(countOfRows)).map((_, i) => maxYLegendValue - i * delta)
    const legendHeight = maxValue > maxYLegendValue
        ? Math.min(maxValue, maxYLegendValue) / Math.max(maxValue, maxYLegendValue) * 100
        : 100

    return <div className={s.gistogram}>
        <Title type={3} message={title}/>
        {
            !loading &&
            <div className={s.gistogram_container}>
                <Grid count_of_rows={countOfRows} height={legendHeight}>
                    {yLegend.map((x) => <div key={x} className={s.legendEl}>{x}</div>)}
                </Grid>
                <div className={s.diagram_container}>
                    <Grid count_of_rows={countOfRows} height={legendHeight}>
                        {yLegend.map(x => <div className={s.line} key={x}/>)}
                    </Grid>
                    <GistogramDataWrapper isFixedCount={!!countOfValues} count={14}>
                        {
                            values.map(item => {
                                return <ColumnWrapper height={item.y / Math.max(maxValue, maxYLegendValue) * 100}
                                                      key={item.y}>
                                    <div className={s.column}/>
                                    <div className={s.data_value}>
                                        {item.y}
                                    </div>
                                </ColumnWrapper>
                            })
                        }
                    </GistogramDataWrapper>
                </div>
                <div/>
                <DataLegend count={count} isFixedCount={!!countOfValues}>
                    {values.map(item => <div className={s.legendEl} key={item.x}>
                        {item.x}
                    </div>)}
                </DataLegend>

            </div>

        }        <Title type={3} message={month} color={'secondary'}/>
    </div>
}

const Grid = styled.div<{ count_of_rows: number, height: number, isAbs?: boolean }>`
  width: 100%;
  height: ${props => props.height}%;
  align-self: end;
  display: grid;
  grid-template-rows: repeat(${props => props.count_of_rows}, 1fr);

`

const ColumnWrapper = styled.div<{ height: number }>`
  width: 24px;
  height: ${props => props.height}%;
  position: relative;
  justify-self: center;
  align-self: flex-end;
  @media (max-width: 567px) {
    width: 12px;
  }
  @media (max-width: 991px) {
    width: 16px;
  }
`
const DataLegend = styled.div<{ count: number, isFixedCount: boolean }>`
  display: grid;
  width: 100%;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(${props => props.count}, 1fr);
`

const GistogramDataWrapper = styled.div<{ count: number, isFixedCount: boolean }>`
  display: grid;
  align-self: flex-end;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  grid-template-columns: repeat(${props => props.count}, 1fr);
`
