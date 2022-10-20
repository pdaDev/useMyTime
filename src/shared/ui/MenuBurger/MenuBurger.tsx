import {FC} from "react";
import s from './MenuBurger.module.scss'

interface MenuBurgerProp {
    open: boolean
    handleClick: () => void
}

export const MenuBurger: FC<MenuBurgerProp> = ({open, handleClick}) => {
    return <div onClick={handleClick}
                data-open={open}
                className={s.menu_burger}
    >
        <div className={`${s.line} ${s.top}`}/>
        <div className={`${s.line} ${s.mid}`}/>
        <div className={`${s.line} ${s.bot}`}/>

    </div>

}