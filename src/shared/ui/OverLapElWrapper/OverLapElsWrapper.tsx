import {FCProp} from "../../lib/types";
import styled from 'styled-components'
import s from './OverLap.module.scss'

const ElWrapper = styled.div<{ pos: number }>`
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: ${({pos}) => pos}%;
`

export const OverLapElsWrapper: FCProp = ({children}) => {
    if (!Array.isArray(children)) {
        return <>children</>
    }
    const countOfEls = children.length
    return <div className={s.container}>
        {[...children].map((child, i) => <ElWrapper key={i}
                                                    pos={ (100 / countOfEls) * i}
        >
            {child}
        </ElWrapper>)}
    </div>

}