import React from "react";
import s from './Popap.module.scss'
import {FCProp} from "../../../lib/types";

import ReactDOM from "react-dom";

const root = document.getElementById('root')

export const Popap: FCProp<{zIndex?: number}> = ({children, zIndex = 1}) => {
    const Popap = <div className={s.popap} style={{zIndex}}>
        {children}
    </div>

    return ReactDOM.createPortal(
        Popap,
        root as any
    )
}
