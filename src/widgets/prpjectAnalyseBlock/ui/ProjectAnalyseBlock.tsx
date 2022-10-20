import s from './ProjectAnalyse.module.scss'
import {Analyse, convertSecondsToTimeFormat, getHour, getMinute, getSecond, rounded, toTimeFromJSON} from 'shared'
import {useTranslation} from "react-i18next";
import {FC, useMemo} from "react";

interface ProjectAnalyseBlockProps {
    tasks: { fulfilled: boolean, id: number, name: string }[]
    tasksWithoutAnonymous: { fulfilled: boolean, id: number, name: string }[]
    projectId: number
    projectTimeToday?: any
    loading: boolean
    totalTime: number
    gistogramData: number[]
}

export const ProjectAnalyseBlock: FC<ProjectAnalyseBlockProps> = ({
                                                                      tasks,
                                                                      totalTime,
                                                                      gistogramData,
                                                                      loading,
                                                                      projectTimeToday
                                                                  }) => {
    const {t} = useTranslation()
    const isLoading = loading
    const lastDate = new Date()
    const firstDate = new Date()
    firstDate.setDate(lastDate.getDate() - 14)
    const values2Week = useMemo(() => {
        const date = new Date()
        date.setDate(new Date().getDate() - 14)
        return Array.apply(null, new Array(14)).map((_, i) => {
            date.setDate(date.getDate() + 1)
            return {
                x: date.getDate(),
                y: gistogramData[i] ? rounded(gistogramData[i]) : 0
            }
        })
    }, [gistogramData])

    const getTimeFromSeconds = () => {
        if (totalTime) {
            const timeInLocalFormat = convertSecondsToTimeFormat(totalTime)
            return totalTime <= 3600 ? getMinute(timeInLocalFormat) : getHour(timeInLocalFormat)
        }
        return 0
    }
    const activities = useMemo(() => {
        const ar = [{task: 37, total: 3}, {task: 39, total: 5000}, {task: 41, total: 900}, {
            task: 40,
            total: 100
        }, {total: 1200, task: 42}]
        return ar.map(item => {
            const timeInLocalFormat = convertSecondsToTimeFormat(item.total)
            const hours = getHour(timeInLocalFormat)
            const minutes = getMinute(timeInLocalFormat)
            const seconds = getSecond(timeInLocalFormat)
            const label = `${hours > 0 ? `${hours} ${t("project.analyse.total.h")} ` : ''}${minutes > 0 ? `${minutes} ${t("project.analyse.total.min")} ` : ''}${(hours > 0 && minutes > 0) ? '' : seconds > 0 ? `${seconds} ${t("project.analyse.total.sec")}` : ''}`
            let name = tasks?.find(task => task.id === item.task)?.name || 'Проект'
            name = name === 'Anonymous Task' ? 'Проект' : name
            return {
                label,
                value: item.total,
                name
            }
        })
    }, [t, tasks])

    const todayActivities = useMemo(() => {
        const response = [{
            task: 37,
            start_time: '2022-09-19T08:30:30.689344+07:00',
            end_time: '2022-09-19T12:20:30.689344+07:00'
        },{
            task: 37,
            start_time: '2022-09-19T12:40:30.689344+07:00',
            end_time: '2022-09-19T15:50:30.689344+07:00'
        }, {
                task: 37,
                start_time: '2022-09-19T16:00:30.689344+07:00',
                end_time: '2022-09-19T17:25:30.689344+07:00'
            },
            {
                task: 39,
                start_time: '2022-09-19T08:30:30.689344+07:00',
                end_time:'2022-09-19T17:25:30.689344+07:00'
            }, {
                task: 40,
                start_time: '2022-09-19T09:25:30.689344+07:00',
                end_time:'2022-09-19T15:42:30.689344+07:00'
            },
            {
                task: 40,
                start_time: '2022-09-19T00:25:30.689344+07:00',
                end_time: '2022-09-19T00:25:30.689344+07:00'
            }]
        return tasks?.map(task => {
            const endpoints = response ? response.filter(session => session.task === task.id)
                .map(session => {
                    return {
                        start: toTimeFromJSON(session.start_time),
                        finish: toTimeFromJSON(session.end_time)
                    }
                }) : []
            return {
                name: task.name !== 'Anonymous Task' ? task.name : 'Проект',
                endpoints
            }
        }).filter(line => line.endpoints.length > 0)|| []
    }, [tasks])
    console.log(todayActivities)

    return <div className={s.grid}>
        <div className={s.first_row}>
            <Analyse.Gistogram title={t("project.analyse.statisticFor2Weeks")}
                               month={`${firstDate.toLocaleString('default', {month: 'long'})}
                               ${firstDate.getMonth() !== lastDate.getMonth() ? ` - ${lastDate.toLocaleString('default', {month: 'long'})}` : ''}`}
                               countOfRows={4}
                               loading={isLoading}
                               countOfValues={14}
                               values={values2Week}
            />
            <div className={s.small_blocks}>
                <Analyse.TotalCard totalValue={getTimeFromSeconds()}
                                   loading={isLoading as any}
                                   title={t("project.analyse.total.title")}
                                   measure={t(`project.analyse.total.${totalTime! <= 3600 ? 'min' : 'hours'}`)}

                />
                <Analyse.CircleDiagramCard title={t("project.analyse.condition")}
                                           loading={isLoading}
                                           part={tasks?.filter(task => task?.fulfilled).length}
                                           parts={tasks?.length}
                />
            </div>
        </div>
        <Analyse.ActivitiesDiagram title={t("project.analyse.todayActivities")}
                                   values={todayActivities}
        />
        <Analyse.LinearDiagram title={t("project.analyse.activities")}
                               values={activities}
                               total={projectTimeToday}

        />
    </div>
}