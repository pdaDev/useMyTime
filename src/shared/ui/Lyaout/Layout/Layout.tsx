import {types} from 'shared/lib'
import s from './Layout.module.scss'
export const Layout: types.FCProp = ({children}) => {
  return <div className={s.layout_wrapper}>
      {children}
  </div>
}