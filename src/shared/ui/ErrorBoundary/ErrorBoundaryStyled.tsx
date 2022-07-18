import {FC} from "react";
import s from './ErrorBoundary.module.scss'

interface IErrorBoundary {
    errorCode: number
    errorMessage: string

}

export const ErrorBoundaryStyled:FC<IErrorBoundary> = ({errorCode, errorMessage}) => {
    return <div className={s.error_boundary}>
        <h1>
            {errorCode}
        </h1>
        <h2>
            {errorMessage}
        </h2>
    </div>

}