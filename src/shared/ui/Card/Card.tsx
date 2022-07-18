import {types} from 'shared/lib'
import s from './Card.module.scss'

interface ICard  {
    width?: number
    height?: number
}

export const Card:types.FCProp<ICard> = ({children, width, height}) => {
    return <div className={s.card} style={{
        width: `${width}px`,
        height:  `${height}px`
    }}>
        {children}
    </div>
}