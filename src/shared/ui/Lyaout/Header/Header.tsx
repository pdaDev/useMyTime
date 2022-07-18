import s from './Header.module.scss'
import {FCProp} from "../../../lib/types";

export const Header: FCProp = ({children}) => {
    return <header className={s.header}>
        {children}
    </header>
}