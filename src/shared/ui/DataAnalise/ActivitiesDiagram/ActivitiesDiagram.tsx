import s from './ActivitiesDiagram.module.scss'
import styled from 'styled-components'
import {FC} from "react";
import {Title} from "../../Title/Title";
import {
    convertTimeToCountOfSeconds,
    findPeriodDuration,
    getTimeWithoutSeconds,
    splitIntoIntervals
} from "../../../lib";

interface IActivitiesDiagram {
    title: string
    values: Array<{
        name: string
        endpoints: Array<{
            start: string
            finish: string
        }>
    }>
}

export const ActivitiesDiagram: FC<IActivitiesDiagram> = ({values, title}) => {
    const limits = {
        start: '8:30:00',
        finish: '18:30:00'
    }
    const countOfRows = values.length
    const countOfColumns = 4

    const timeValues = splitIntoIntervals(limits.start, limits.finish, countOfColumns)
    const periodOfWorkInSec = convertTimeToCountOfSeconds(findPeriodDuration(limits.start, limits.finish))
    const getWidth = (value: {start: string, finish: string}) => {
       const periodDurationInSec = convertTimeToCountOfSeconds(findPeriodDuration(value.start, value.finish))
       return 100 * periodDurationInSec / periodOfWorkInSec
    }
    const getPos = (value: {start: string, finish: string }) => {
        const timeSinceWorkStartInSec = convertTimeToCountOfSeconds(findPeriodDuration(limits.start, value.start))
        return 100 * timeSinceWorkStartInSec / periodOfWorkInSec
    }
    return <div className={s.activities_diagram}>
        <Title type={3} message={title}/>
        <div className={s.b}>
            <Legend countOfRows={countOfRows}>
                {
                    values.map((value) => <div key={value.name}>
                        <Title type={5}
                               message={value.name}/>
                    </div>)
                }
            </Legend>
            <div className={s.diagram_container}>
                <Grid countOfColumns={countOfColumns}>
                    {Array.apply(null, new Array(countOfColumns))
                        .map((_, i) => <div className={s.column} key={i}>
                            <div className={s.time_title}>
                                <Title type={5} message={getTimeWithoutSeconds(timeValues[i])}
                                       color={'secondary'}/>
                            </div>
                        </div>)}
                </Grid>
                <DiagramContainer countOfRows={countOfRows}>
                    {
                        values.map(value => <div className={s.els_wrapper} key={value.name}>
                            {value.endpoints.map(value =>
                                <ElWrapper width={getWidth(value)}
                                    position={getPos(value)}
                                >
                                    <div className={s.el}/>
                                </ElWrapper>)}
                        </div>)
                    }

                </DiagramContainer>
            </div>
            <div className={s.last_time_title}>
                <Title type={5} message={getTimeWithoutSeconds(limits.finish)} color={'secondary'}/>
            </div>

        </div>
    </div>
}

const Legend = styled.div<{countOfRows: number}>`
  width: auto;
  min-width: 100px;
  padding-top: 30px;
  margin-right: 20px;
  height: 100%;
  align-items: center;
  display: grid;
  row-gap: 5px;
  @media (max-width: 567px) {
    min-width: 0;
  }
  grid-template-rows: repeat(${({countOfRows}) => countOfRows}, 30px);
`

const DiagramContainer = styled.div<{ countOfRows: number }>`
  width: 100%;
  padding-top: 30px;
  height: 100%;
  display: grid;
  row-gap: 5px;
  grid-template-rows: repeat(${({countOfRows}) => countOfRows}, 30px);
`

const Grid = styled.div<{ countOfColumns: number }>`
  display: grid;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(${({countOfColumns}) => countOfColumns}, 1fr);
`

const ElWrapper = styled.div<{ width: number, position: number }>`
  width: ${({width}) => width}%;
  position: absolute;
  left: ${({position}) => position}%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media(max-width: 567px) {
    height: 20px
  }
`

