import {FC, useState} from "react";
import {Title} from "../../Title/Title";
import s from'./ChooseCouple.module.scss'

interface IChooseCouple {
    title: string
    options: Array<{value: string, label: string, handleClick: () => void}>
    defaultValue: string
}

export const ChooseCouple: FC<IChooseCouple> = ({title, options, defaultValue}) => {
    const [selectedValue, selectValue] = useState(defaultValue)
    const setFirstValue = () => {
        selectValue(options[0].value)
        options[0].handleClick()
    }
    const setSecondValue = () => {
        selectValue(options[1].value)
        options[1].handleClick()
    }
    const toggleValue = () =>  selectedValue === options[0].value ? setSecondValue() : setFirstValue()

    return <div className={s.choose_couple}>
        <Title type={4} message={title}/>
        <div className={s.switcher_wrapper}>
            <div onClick={setFirstValue}>
                <Title type={5} message={options[0].label} color={selectedValue === options[0].value ? 'primary' : 'secondary'}/>
            </div>
            <div className={s.track}
                 onClick={toggleValue}
                 data-active-right={selectedValue === options[1].value}
            >
                <div className={s.left_space}/>
                <div className={s.thumb}/>
                <div className={s.right_space}/>
            </div>
            <div onClick={setSecondValue}>
                <Title type={5} message={options[1].label} color={selectedValue === options[1].value ? 'primary' : 'secondary'}/>
            </div>

        </div>
    </div>
}