import {FC, useRef, useState} from "react";
import s from './HiddenInput.module.scss'

interface IHiddeninput {
    type: 'input' | 'textarea'
    onSave: (newValue: string) => void
    config?: object
    enableEdit: boolean
    semanticType?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const ChangeInput: FC<Omit<IHiddeninput, 'enableEdit'> & { defaultText: string }> = (
    {
        type,
        config,
        defaultText,
        onSave,
        semanticType = 'p'
    }) => {
    const InputType: keyof JSX.IntrinsicElements = `${type}`

    const [isActive, setIsActive] = useState<boolean>(false)
    const SemanticType: keyof JSX.IntrinsicElements = `${semanticType}`
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
        <div onClick={activate}
             onBlur={disactivate}
             className={s.hidden_input}
             data-enable-input={true}
        >

            {isActive ? <InputType type={'text'}
                                   {...config}
                                   value={text}
                                   ref={ref}
                                   onChange={e => setText(e.target.value)}
            /> : <div className={s.first_el}>
                <SemanticType>{text}</SemanticType>
            </div>
            }
        </div>

    )

}

export const HiddenInput: FC<IHiddeninput & { defaultText: string | undefined }> = ({enableEdit, ...props}) => {
    const SemanticType: keyof JSX.IntrinsicElements = `${props.semanticType || 'p'}`
    if (!enableEdit) {
        return <div className={s.hidden_input}
                    data-loading={props.defaultText === undefined}>
            <div className={s.first_el}>
                <SemanticType>{props.defaultText}</SemanticType>
            </div>
        </div>
    }
    if (props.defaultText === undefined) {
        return <div className={s.hidden_input} data-loading={true}/>
    }
    return <ChangeInput {...props} defaultText={props.defaultText!}/>
}
