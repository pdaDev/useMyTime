import s from './Bar.module.scss'
import {FCProp} from "../../../lib/types";

export const Bar: FCProp = ({children}) => {
    return <div className={s.bar}>
        {children}
    </div>

}

