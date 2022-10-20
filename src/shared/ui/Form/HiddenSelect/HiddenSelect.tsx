import {FC, useMemo, useRef} from "react";
import './HiddenSelect.scss'
import Select from "react-select";
import {useOpenClose} from "../../../lib";

interface HiddenSelectProps {
    enableChoose: boolean
    onSave: Function
    semanticType?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    values: any[]
    defaultText: string
    getOptionsFunction: Function
}

interface IOption {
    label: string
    value: string
}

const Selector: FC<Omit<HiddenSelectProps, 'enableChoose'>> = ({semanticType, defaultText, values, getOptionsFunction, onSave}) => {
    const [isOpen, open, close] = useOpenClose(false)
    const timer = useRef<NodeJS.Timer>()
    const SemanticType: keyof JSX.IntrinsicElements = `${semanticType || 'p'}`
    const options: IOption[] = useMemo(() => getOptionsFunction(values), [values, getOptionsFunction])
    const onChange = (value: any) => {
        onSave(value.value)
        setTimeout(close, 100)
    }

    const onBlur = () => {
         timer.current  = setTimeout(close)
    }

    const onFocus = () => {
        clearTimeout(timer.current)
    }
    const openSelector = () => {
        open()
        setTimeout(() => ref.current?.focus(), 50)
    }
    

    const ref = useRef<HTMLDivElement>(null)
    return <div onClick={openSelector}
                ref={ref}
                onFocus={onFocus}
                data-enable-choose={true}
                tabIndex={0}
                onBlur={onBlur}
                className={'hidden_select_container'}
    >
        {isOpen ? <Select options={options}
                          value={options.find(value => value.label === defaultText)}
                          onChange={onChange}
                          menuIsOpen={true}
                          classNamePrefix={'hs'}
            />
            : <SemanticType>
                {defaultText}
            </SemanticType>
        }

    </div>
}

export const HiddenSelect: FC<HiddenSelectProps> = ({enableChoose, ...props}) => {
    const SemanticType: keyof JSX.IntrinsicElements = `${props.semanticType || 'p'}`

    if (!props.defaultText) {
        return  <div className={'hidden_select_container'}/>
    }
    if (!enableChoose) {
        return <div className={'hidden_select_container'}
        >
            <SemanticType>{props.defaultText}</SemanticType>
        </div>
    }
    return  <Selector {...props}/>



}

