
import s from './Center.module.scss'
import {FCProp} from "../../../lib/types";

export const Center: FCProp = ({children}) => {
    return <div className={s.center}>
        {children}
    </div>
}