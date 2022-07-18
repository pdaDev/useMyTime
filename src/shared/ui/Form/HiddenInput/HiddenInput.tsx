import {FC, useRef, useState} from "react";
import s from './HiddenInput.module.scss'

interface IHiddeninput {
    type: 'input' | 'textarea'
    onSave: (newValue: string) => void
    config?: object
    defaultText: string
}

export const HiddenInput: FC<IHiddeninput> = (
    {
        type,
        config,
        defaultText,
        onSave
    }) => {
    const InputType: keyof JSX.IntrinsicElements = `${type}`
    const [isActive, setIsActive] = useState<boolean>(false)
    const activate = () => {
        setIsActive(true)
        setTimeout(() => ref.current.focus(), 0)
    }
    const disactivate = () => {
        setIsActive(false)
        defaultText !== text && onSave(text)
    }
    const [text, setText] = useState<string>(defaultText)
    const ref = useRef<any>(null)
    return (
        <div onDoubleClick={activate} onBlur={disactivate} className={s.hidden_input}>

            {isActive ? <InputType type={'text'}
                                   {...config}
                                   value={text}
                                   ref={ref}
                                   onChange={e => setText(e.target.value)}
            /> : <p>{text}</p>}
        </div>

    )


}
