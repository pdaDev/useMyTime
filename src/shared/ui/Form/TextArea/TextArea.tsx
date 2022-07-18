import {FC} from "react";
import s from './TextArea.module.scss'

interface ITextArea {
    registerEl: object
    error: string
    config?: {
        placeholder: string
    }
    validationType?: 'message' | 'placeholder'

}

export const TextArea: FC<ITextArea> = ({registerEl, validationType ='placeholder', error, config}) => {
    return (
        <div className={s.textarea_wrapper}
             data-has-error={!!error}
        >
            { validationType === 'message' && <h5>
                {error}
            </h5>}
            <textarea {...registerEl}
                      {...config}
                      placeholder={ validationType === 'placeholder'
                          ? (error || (config?.placeholder || ''))
                          : (config?.placeholder || '')}
            />
        </div>

    )
}