import {FC, useEffect, useState} from "react";
import s from './TextInput.module.scss'
import {NotVisibleIcon, VisibleIcon} from "../../Icons";
import {InputWrapper} from "./TextInput.styles";

interface ITextInput {
    type: 'text' | 'password'
    registerEl?: any
    size?: 'large' | 'small' | 'medium'
    width?: number
    showPassword?: boolean
    error?: any
    config?: {
        placeholder: string
    }
    validationType?: 'message' | 'placeholder'
}

export const TextInput: FC<ITextInput> = (
    {
        type,
        size = 'medium',
        registerEl,
        width,
        showPassword,
        error,
        validationType = 'message',
        config
    }) => {
    const [inputType, setInputType] = useState<ITextInput["type"]>(type)
    const hasError = !!error
    useEffect(() => {
        (type === 'password') && (showPassword ? setInputType('text') : setInputType('password'))
    }, [showPassword,type])

    return (
        <InputWrapper width={width} size={size} hasError={hasError}>
            {validationType === 'message' && <h5>{error || 'error'}</h5>}
            <label>
                <input className={s.input}
                       type={inputType}
                       {...config}
                       data-error={hasError}
                       {...registerEl}
                       placeholder={ validationType === 'placeholder'
                           ? (error || (config?.placeholder || ''))
                           : (config?.placeholder || '') }
                />
                {
                    type === 'password' &&
                    <img src={inputType === 'text' ? NotVisibleIcon : VisibleIcon}
                         onMouseDown={() => setInputType('text')}
                         onMouseUp={() => setInputType('password')}
                         alt={'password eye icon'}
                    />
                }
            </label>
        </InputWrapper>)
}


