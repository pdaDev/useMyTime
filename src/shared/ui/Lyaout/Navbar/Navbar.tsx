import {FCProp} from "../../../lib/types";
import s from './NavBar.module.scss'

export const Navbar: FCProp = ({children}) => {
    return <aside className={s.navbar}>
        {children}
    </aside>
}