import {FC, useRef, useState} from "react";
import s from './DownloadReport.module.scss'
import {Calendar, Form, Layout, rounded, Title, toJSONDate, useError, useNotify, useOpenClose} from 'shared'
import {useTranslation} from "react-i18next";
import Select from "react-select";
import './DownloadReport.scss'
import {UserSelectors} from 'entities/user'

import * as FileSaver from "file-saver";
import * as XLSX from 'xlsx';
import {
    useGetDirectionTypeOfProjectsQuery,
    useGetReportMutation,
    useGetTypesOfProjectQuery
} from "../../../entities/project";
import {useSelector} from "react-redux";


interface IDates {
    toDate: Date
    sinceDate: Date
}

export const DownloadReportBlock: FC = () => {

    const exportToExcel = (csvData: Array<object>, fileName: string) => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    const {data: directioTypes, isSuccess: directioTypesSucces, error: getDirectionsError} = useGetDirectionTypeOfProjectsQuery()
    const {data: projectTypes, isSuccess: prjectTypeSuccess, error: getTypesError} = useGetTypesOfProjectQuery()

    const succesGetItembooks = directioTypesSucces && prjectTypeSuccess
    const [download, { isError, isLoading }] = useGetReportMutation()
    useNotify(isError, 'Не удалось загрузить отчет', 'error');
    const first_name = useSelector(UserSelectors.getName)
    useError([getTypesError, getDirectionsError])

    const handleDownloadButtonClick = async () => {
        const body = {
            start: toJSONDate(dates.current.toDate),
            end: toJSONDate(dates.current.sinceDate)
        }
        await download(body).unwrap()
            .then((report) => {
                if (report) {
                    const data = Object.keys(report).map(key => {
                        const task = report[key as any]
                        const tablesColumns = {
                            department: 'Отдел',
                            employee: 'Сотрудник',
                            percents: '%',
                            hours: 'Часы',
                            b: 'Б',
                            type: 'Тип',
                            order: 'Заказ',
                            encryption: 'Расшифровка'
                        }
                        return {
                            [tablesColumns["department"]]: task.department,
                            [tablesColumns["employee"]]: first_name,
                            [tablesColumns["hours"]]: rounded(task.hours),
                            [tablesColumns["percents"]]: rounded(task.percents),
                            [tablesColumns["b"]]: directioTypes!.find(dt =>dt.id === task.direction_type),
                            [tablesColumns["type"]]: projectTypes!.find(pt => pt.id === task.project_type),
                            [tablesColumns["order"]]: task.order,
                            [tablesColumns['encryption']]: task.description
                        }
                    })
                    data[0]['Всего'] = rounded(Object.keys(report).reduce((totalTime, key) => {
                        totalTime += report![key as any].hours
                        return totalTime
                    }, 0))
                    let fileName
                    switch (typeOfReport) {
                        case "today":
                            fileName = 'сегодня'
                            break
                        case 'twoweeks':
                            fileName = '2 недели'
                            break
                        case 'month':
                            fileName = 'месяц'
                            break
                        case "chooseDate":
                            fileName = `период с ${dates.current.sinceDate.toLocaleDateString()} по ${dates.current.toDate.toLocaleDateString()}`
                    }
                    fileName = `${fileName} ${first_name}`
                    exportToExcel(data, `Отчет за ${fileName}`)
                }
            })



    }
    const {t} = useTranslation()
    const dates = useRef<IDates>({toDate: new Date(), sinceDate: new Date()})
    const [typeOfSelectedDate, setTypeOfSelectedDate] = useState<keyof IDates>('sinceDate')
    const typesOfReport = ['today', 'twoweeks', 'month', 'chooseDate'] as const
    const [typeOfReport, setTypeOfReport] = useState<typeof typesOfReport[number]>('today')
    const [isCalendarOpen, open, close] = useOpenClose()
    const isChooseDate = typeOfReport === 'chooseDate'
    const resetPeriod = () => setTypeOfReport('today')
    const options = typesOfReport.map(type => ({
        value: type,
        label: t(`project.reportProps.${type}`)
    }))
    const onChange = (value: any) => {
        if (value.value === 'chooseDate') {
            openCalendarSinceEdit()
        }
        if (value.value === 'today') {
            dates.current.toDate = new Date()
            dates.current.sinceDate = new Date()
        }
        if (value.value === 'month') {
            dates.current.toDate = new Date()
            dates.current.sinceDate = new Date(dates.current.toDate.getDate() - 30)
        }
        if (value === 'twoweeks') {
            dates.current.toDate = new Date()
            dates.current.sinceDate = new Date(dates.current.toDate.getDate() - 14)
        }
         setTypeOfReport(value.value)
    }
    const getValue = (value: string) => {
        return options.find(o => o.value === value)
    }
    const openCalendarToEdit = () => {
        setTypeOfSelectedDate('toDate')
        open()
    }
    const openCalendarSinceEdit = () => {
        setTypeOfSelectedDate('sinceDate')
        open()
    }

    return <>
        <div className={s.container}>
            <div className={s.choose_period}>
                <div>
                    <Title type={4} message={t("project.report")}/>
                    {!isChooseDate && <>
                        <Title type={4} message={t("app.locales.for")}/>
                        <div className={'download_report_select_wrapper'}>
                            <Select options={options as any}
                                    value={getValue(typeOfReport)}
                                    onChange={onChange}
                                    classNamePrefix={'report-select'}
                            />
                        </div>
                    </>}
                    {
                        isChooseDate && <>
                            <Title type={4} message={t("app.locales.since")}/>
                            <div className={s.edit_date} onClick={openCalendarSinceEdit}>
                                <Title type={4}
                                       message={dates.current.sinceDate.toLocaleDateString()}
                                       color={'main'}
                                />
                            </div>
                            <Title type={4} message={t("app.locales.to")}/>
                            <div className={s.edit_date} onClick={openCalendarToEdit}>
                                <Title type={4}
                                       message={dates.current.toDate.toLocaleDateString()}
                                       color={'main'}
                                />
                            </div>
                        </>
                    }
                </div>
                {
                    isChooseDate && <div onClick={resetPeriod}
                                         className={s.reset_button}
                    >
                        {t("project.reportProps.reset")}
                    </div>

                }

            </div>

            <div className={s.download_report}>
                <Form.Button type={'primary'}
                             size={'large'}
                             message={t("project.downloadReport")}
                             onClick={handleDownloadButtonClick}
                             fullWidth
                             disabled={isLoading || !succesGetItembooks}
                />
            </div>
        </div>
        {
            isCalendarOpen && isChooseDate && <Layout.Popap>
                <Calendar setDate={close}
                          close={close}
                          defaultChangeStatus={typeOfSelectedDate}
                          defaultDates={dates.current}
                />
            </Layout.Popap>
        }
    </>
}