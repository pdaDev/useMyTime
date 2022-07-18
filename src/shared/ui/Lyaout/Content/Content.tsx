import s from './Content.module.scss'
import {FCProp} from "../../../lib/types";


export const Content: FCProp = ({children}) => {
    return <div className={s.content_container}>
        <div className={s.content}>
            {children}
        </div>
    </div>
}