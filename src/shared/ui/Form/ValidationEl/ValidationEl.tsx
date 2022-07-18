import {FC} from "react";
import s from './Validation.module.scss'

interface IValidationEl {
    registerEl: object
    error: any
}

export const ValidationEl: FC<IValidationEl> = ({error, registerEl}) => {
    const hasError = !!error
    return <div className={s.validation_el_wrapper}
                data-has-error={hasError || '        '}
    >
        <h5>{error || ''}</h5>
        <input type="text"
               {...registerEl}
        />
    </div>
}