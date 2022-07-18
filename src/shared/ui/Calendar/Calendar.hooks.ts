import {useRef, useState} from "react";
import {useForceUpdate} from "../../lib";


export const useCalendar = (isEngLanguage: boolean) => {

    const date = useRef(new Date())
    const render = useForceUpdate()
    const getCountOfDays = (month: number) => {
        switch (month) {
            case 0:
                return 31
            case 1:
                return (date.current.getFullYear() - 1972) % 4 === 0 ? 29 : 28
            case 2:
                return 31
            case 3:
                return 30
            case 4:
                return 31
            case 5:
                return 30
            case 6:
                return 31
            case 7:
                return 31
            case 8:
                return 30
            case 9:
                return 31
            case 10:
                return 30
            case 11:
                return 31
        }
    }
    let dayOfWeekMonthStart = new Date(date.current.getFullYear(), date.current.getMonth()).getDay() - (isEngLanguage ? 0 : 1)
    dayOfWeekMonthStart = dayOfWeekMonthStart > 0 ? dayOfWeekMonthStart : 6

    const countOfDaysPsttMonth = getCountOfDays(new Date(date.current.getFullYear(), date.current.getMonth() - 1).getMonth())
    const daysOfPastMonth = Array.apply(null ,new Array(dayOfWeekMonthStart)).map((x, i) => countOfDaysPsttMonth! - i)
    const upMonth = () => {
        date.current.setMonth(date.current.getMonth() + 1)
        render()
    }
    const downMonth = () => {
        date.current.setMonth(date.current.getMonth() - 1)
        render()
    }
    return {date: date.current,
        upMonth,
        downMonth,
        countOfMonthDays: getCountOfDays(date.current.getMonth()),
        daysOfPastMonth,
        dayOfWeekMonthStart
    }
}

export const useSelectDate = (
    date: Date,
    defaultDates?: { sinceDate: Date, toDate: Date },
    defaultChangeStatus?: 'sinceDate' | 'toDate'
    ) => {
    const dates = useRef( defaultDates || {
            sinceDate: new Date(),
            toDate: new Date()
        }
    )
    const [changeStatus, setChangeStatus] = useState<'sinceDate' | 'toDate'>(defaultChangeStatus || 'toDate')
    const render = useForceUpdate()
    const setToChangeStatus = () => setChangeStatus('toDate')
    const setSinceChangeStatus = () => setChangeStatus('sinceDate')
    const selectDayNumber = (day: number) => {
        dates.current[changeStatus].setDate(day)
        dates.current[changeStatus].setMonth(date.getMonth())
        dates.current[changeStatus].setFullYear(date.getFullYear())
        render()
    }
    return {dates, setToChangeStatus, setSinceChangeStatus, selectDayNumber, changeStatus}
}