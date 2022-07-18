import {FC, useEffect, useRef, useState} from "react";
import s from './ChooseTimeClock.module.scss'
import {useClassState} from "../../lib";
import styled, {css} from "styled-components";
import classNames from "classnames";
import {Title} from "../Title/Title";
import {Button} from "../Form";
import {useTranslation} from "react-i18next";
import 'i18next'

interface IChooseTimeClock {
    type: 'range' | 'single'
    setTime: () => void
    close: () => void
    defaultTime: Date

}

type Time = {
    since: number
    to: number
}


export const ChooseTimeClock: FC<IChooseTimeClock> = ({type = 'range', defaultTime, close, setTime}) => {

    const { t } = useTranslation()

    let defaultHour: Partial<Time> = {}
    let defaultDecade: Partial<Time> = {}
    let defaultMinute: Partial<Time> = {}

    defaultHour.since = 0
    defaultDecade.since = 0
    defaultMinute.since = 0
    defaultHour.to = defaultTime.getHours()
    defaultDecade.to = Math.floor(defaultTime.getMinutes() / 10) * 10
    defaultMinute.to = defaultTime.getMinutes() - defaultDecade.to

    const [changeStatus, setChangeStatus] = useState<keyof Time>('to')
    const [hours, setHours] = useClassState<Time>(defaultHour as Time)
    const [decadeMinutes, setDecadeMinutes] = useClassState<Time>(defaultDecade as Time)
    const [concreteMinute, setConcreteMinute] = useClassState<Time>(defaultMinute as Time)
    const hoursValues = Array.apply(null, new Array(24)).map((x, i) => i)
    const decadeMinutesValues = Array.apply(null, new Array(6)).map((x, i) => i * 10)
    const minutesValues = Array.apply(null, new Array(10)).map((x, i) => i)
    const chooseHour = (hour: number | null) => setHours({[changeStatus]: hour})
    const chooseDecadeMinutes = (decade: number | null) => setDecadeMinutes({[changeStatus]: decade})
    const chooseMinute = (minute: number | null) => setConcreteMinute({[changeStatus]: minute})
    const setSinceChangeStatus = () => setChangeStatus('since')
    const setToChangeStatus = () => setChangeStatus('to')
    const getFullTime = (cs: typeof changeStatus = changeStatus) => `${hours[cs].toString().padStart(2, '0')}:${(decadeMinutes[cs] + concreteMinute[cs]).toString().padStart(2, '0')}`
    const submit = () => {
        setTime()
        defaultTime.setHours(hours.to)
        defaultTime.setMinutes(decadeMinutes.to + concreteMinute.to)
    }
    return <div className={s.choose_time_clock}>
        <div className={classNames(s.cont, s.hours)}>
            <RoundWrapper elements={hoursValues}
                          changeStatus={changeStatus}
                          time={hours}
                          chooseEl={chooseHour}
            />
            <div className={classNames(s.cont, s.decade_minutes)}>
                <RoundWrapper elements={decadeMinutesValues}
                              changeStatus={changeStatus}
                              time={decadeMinutes}
                              chooseEl={chooseDecadeMinutes}/>
                <div className={classNames(s.cont, s.minutes)}>
                    <RoundWrapper elements={minutesValues}
                                  changeStatus={changeStatus}
                                  time={concreteMinute}
                                  chooseEl={chooseMinute}/>
                    <div className={s.time}>
                        {getFullTime()}
                    </div>
                </div>
            </div>
        </div>


        <div className={s.output}>
            {type === 'range' &&
                <div onClick={setSinceChangeStatus} className={`${changeStatus === 'since' && s.active}`}>
                    <Title type={5}
                           message={t("app.locales.since")}
                           color={'main'}
                    />
                    &nbsp;
                    <Title type={5} message={getFullTime('since')}/>
                </div>}
            {type === 'single' && <Title type={4}
                                         message={t("calendar.selectedTime")}
            />}
            <div onClick={setToChangeStatus} className={`${changeStatus === 'to' && s.active}`}>
                {type === 'range' && <Title type={5} message={t("app.locales.to")} color={'main'}/>}
                &nbsp;
                <Title type={5} message={getFullTime('to')}/>
            </div>

        </div>
        <div className={s.buttons_block}>
            <Button type={'secondary'}
                    message={t("form.decline")}
                    size={'small'}
                    onClick={close}/>
            <Button type={'primary'}
                    message={t("form.accept")}
                    size={'small'}
                    onClick={submit}/>
        </div>

    </div>
}

interface IRoundWrapper {
    elements: number[]
    changeStatus: keyof Time
    time: Time
    chooseEl: (time: number) => void
}

const RoundWrapper: FC<IRoundWrapper> = ({elements, time, changeStatus, chooseEl}) => {
    const ref = useRef<HTMLDivElement>(null)
    const anc = Math.PI * 2 / elements.length
    const [radius, setRadius] = useState<number>(0)
    const elSize = 35
    useEffect(() => {
        setRadius(ref.current!.clientWidth / 2 || 0)
    }, [ref])
    return <div className={s.round_wrapper}
                ref={ref}
    >
        {elements.map((el, i) => {
            const angle = anc * i
            let baseAngle = -88 * Math.PI / 180
            const x = radius * Math.cos(angle + baseAngle) + radius - elSize / 2
            const y = radius * Math.sin(angle + baseAngle) + radius - elSize / 2
            return <El x={x}
                       y={y}
                       size={elSize}
                       active={el === time[changeStatus]}
                       onClick={() => chooseEl(el)}
            >
                {el}
            </El>
        })}
    </div>
}
const El = styled.div<{ x: number, y: number, size: number, active: boolean }>`
  position: absolute;
  background: var(--clr-inpt);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--fnt-size-semi-md);
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  ${props => props.active && css`
    background: #3180FF;
    color: white;
  `}
`