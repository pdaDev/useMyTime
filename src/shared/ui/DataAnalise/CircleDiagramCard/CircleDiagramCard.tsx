import {FC} from "react";
import s from './CircleDiagram.module.scss'
import {CircleDiagram} from "../CircleDiagram/CircelDiagram";
import {Title} from "../../Title/Title";

interface ICircleDiagramCard {
    title: string | null | undefined
    part: number | null | undefined
    parts: number | null | undefined
    loading?: boolean
}
export const CircleDiagramCard:FC<ICircleDiagramCard> = (
    {
        title,
        part,
        parts,
        loading = false
    }) => {
    const loadingStatus =  loading
    return <div className={s.circle_diagram_card}>
        <Title type={3} message={title || ''} loading={loadingStatus}/>
        <div className={s.diagram}>
            <CircleDiagram parts={parts || 0} part={loadingStatus ? 0 : part!}/>
            <div className={s.data}>
                {!loadingStatus && <>
                    <Title type={2}
                           message={`${~~ (part! / parts! * 100)}%`}
                           loading={loading}
                    />
                    <Title type={4}
                           message={`${part}/${parts}`}
                           loading={loading}
                           color={'secondary'}
                    />
                </>}
            </div>
        </div>
    </div>
}