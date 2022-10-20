import {FC} from "react";
import s from './Title.module.scss'
import {TitleWrapper} from "./Tilte.styles.";


interface ITitle {
    type: 1 | 2 | 3 | 4 | 5 | 6
    message: string | null | undefined
    loading?: boolean
    color?: 'primary' | 'secondary' | 'main'
    weight?: 'bold' | 'semi-bold' | 'medium' | 'regular'
    size?: number

}

export const Title: FC<ITitle> = ({
                                      type,
                                      message,
                                      loading = false,
                                      color= 'primary',
                                      weight,
                                      size
                                  }) => {
    let TitleType: keyof JSX.IntrinsicElements = `h${type}`
    const isLoading = loading || !message
    return (
        <TitleWrapper size={size} weight={weight} loading={isLoading}
        >
            <div className={s.title}
                 data-loading={isLoading}
                 data-color-type={color}
                 data-weight-type={weight}
            >
                <TitleType>{isLoading ? '1' : message}</TitleType>
            </div>
        </TitleWrapper>
    )
}
