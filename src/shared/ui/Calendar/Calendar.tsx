import {FC} from "react";
import s from './Calendar.module.scss'
import {ArrowButton} from "../ArrowButton/ArrowButton";
import {useCalendar, useSelectDate} from './Calendar.hooks'
import {Title} from "../Title/Title";
import {Button} from "../Form";
import { useTranslation} from "react-i18next";
import 'i18next'
interface IDates {
    sinceDate: Date
    toDate: Date
}

interface ICalendar {
    setDate: () => void
    close: () => void
    defaultDates?: IDates | Date
    defaultChangeStatus?: 'sinceDate' | 'toDate'
    type?: 'single' | 'range'
}

export const Calendar: FC<ICalendar> = ({setDate, defaultDates, defaultChangeStatus, close, type= 'range'}) => {
    const currentDate = new Date()
    const { t, i18n } = useTranslation()

    const isEngLanguage = i18n.language === 'eng'

    const daysOfWeekEngFormat = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    const daysOfWeekRuFormat = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
    const monthsNames = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
    const monthsNamesEngFormat = ['january', 'february', 'march', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
    const {
        date,
        upMonth,
        downMonth,
        countOfMonthDays,
        daysOfPastMonth,
        dayOfWeekMonthStart
    } = useCalendar(isEngLanguage)
    const firstEndOfWeek = 7 - dayOfWeekMonthStart
    const firstStartOfWeek = dayOfWeekMonthStart === 0 ? 1 : firstEndOfWeek + 1
    const defDate = type === "range" ? defaultDates as IDates : {sinceDate: new Date(), toDate: defaultDates as Date}
    const {
        dates,
        setSinceChangeStatus,
        setToChangeStatus,
        selectDayNumber,
        changeStatus
    } = useSelectDate(date, defDate, defaultChangeStatus)

    const isCurrentDay = (day: number) => currentDate.getFullYear() === date.getFullYear() &&
        currentDate.getMonth() === date.getMonth() && day === currentDate.getDate()
    const isSelectedDay = (day: number) => (( dates.current.sinceDate.getFullYear() === date.getFullYear() &&
            dates.current.sinceDate.getMonth() === date.getMonth() && dates.current.sinceDate.getDate() === day) && type === 'range')
        || (dates.current.toDate.getFullYear() === date.getFullYear() &&
            dates.current.toDate.getMonth() === date.getMonth() && dates.current.toDate.getDate() === day)
    const isStartOfWeek = (day: number) => (day - firstStartOfWeek) % 7 === 0
    const isEndOfWeek = (day: number) => (day - firstEndOfWeek) % 7 === 0
    const isStartOfRange = (day: number) => dates.current.sinceDate.getFullYear() === date.getFullYear()
        && date.getMonth() === dates.current.sinceDate.getMonth() && day === dates.current.sinceDate.getDate()
    const isEndOfRange = (day: number) => dates.current.toDate.getFullYear() === date.getFullYear()
        && date.getMonth() === dates.current.toDate.getMonth() && day === dates.current.toDate.getDate()
    const isEnterOfRange = (day: number) => {
        if (date.getFullYear() >= dates.current.sinceDate.getFullYear() && date.getFullYear() <= dates.current.toDate.getFullYear()) {
            if (date.getMonth() >= dates.current.sinceDate.getMonth() && date.getMonth() <= dates.current.toDate.getMonth()) {
                const isStartMonth = date.getMonth() === dates.current.sinceDate.getMonth()
                const isEndMonth = date.getMonth() === dates.current.toDate.getMonth()
                const isLeftDay = day >= dates.current.sinceDate.getDate()
                const isRightDay = day <= dates.current.toDate.getDate()

                if (isStartMonth && isEndMonth) {
                    return isLeftDay && isRightDay;
                }
                if (isStartMonth) {
                    return isLeftDay;
                }
                if (isEndMonth) {
                    return isRightDay;
                }
                return true
            }
        }
        return false

    }
    const isAvailableToSubmit = dates.current.toDate.getTime() < dates.current.sinceDate.getTime()
    const submit = () => {
        setDate()
    }

    return <div className={s.calendar}>
        <div className={s.legend}>
            <Title type={4} message={date.getFullYear().toString()}/>
            <div className={s.navigation_block}>
                <ArrowButton direction={"left"} color={"black"} size={"large"} handleClick={downMonth}/>
                <Title type={4} message={(isEngLanguage ? monthsNamesEngFormat : monthsNames)[date.getMonth()]}/>
                <ArrowButton direction={"right"} color={"black"} size={"large"} handleClick={upMonth}/>
            </div>
        </div>
        <div className={s.grid}>
            {(isEngLanguage ? daysOfWeekEngFormat : daysOfWeekRuFormat)
                .map(day => <div className={s.primary_el} key={day}>{day}</div>)}
            {daysOfPastMonth.map(x => <div className={s.secondary_el}>{x}</div>)}
            {Array.apply(null, new Array(countOfMonthDays)).map((x, i) =>
                <div
                    className={`${s.primary_el}
                     ${isCurrentDay(i + 1) && s.current_day}
                      ${ isSelectedDay(i + 1) && s.active}
                          ${type === 'range' && isEnterOfRange(i + 1) && s.sub_active}
                          ${type === 'range' && !isEndOfWeek(i + 1) && !isEndOfRange(i + 1) && i + 1 !== countOfMonthDays && s.right_with_no_border}
                          ${type === 'range' && !isStartOfWeek(i + 1) && !isStartOfRange(i + 1) && i + 1 !== 1 && s.left_with_no_border}
                      `}

                    onClick={() => selectDayNumber(i + 1)}>
                    {i + 1}
                </div>
            )}
            {Array.apply(null, new Array(42 - countOfMonthDays! - daysOfPastMonth.length)).map((x, i) => <div
                className={s.secondary_el}>{i + 1}  </div>)}
        </div>
        <div className={s.output}>
            {type === 'range' && <div onClick={setSinceChangeStatus} className={`${changeStatus === 'sinceDate' && s.active}`}>
                <Title type={5}
                       message={t("app.locales.since")}
                       color={'main'}/>
                &nbsp;
                <Title type={5} message={dates.current.sinceDate.toLocaleDateString()}/>

            </div>}
            {
                type === 'single' && <Title type={4}
                                            message={t("calendar.selectedDate")}
                />
            }
            <div onClick={setToChangeStatus} className={`${changeStatus === 'toDate' && s.active}`}>
                {
                   type === 'range' && <Title type={5} message={t("app.locales.to")} color={'main'}/>
                }
                &nbsp;
                <Title type={5}
                       message={dates.current.toDate.toLocaleDateString()}
                />
            </div>
        </div>
        <div className={s.buttons_block}>
            <Button type={'secondary'}
                    message={t("form.decline")}
                    size={"small"}
                    onClick={close}
            />
            <Button type={"primary"}
                    message={t("form.accept")}
                    size={"small"}
                    onClick={submit}
                    disabled={isAvailableToSubmit}
            />
        </div>
    </div>
}



