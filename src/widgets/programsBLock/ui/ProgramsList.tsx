import {FC} from "react";
import {Title} from "shared";
import {useSelector} from "react-redux";
import {TimerSelectors} from 'entities/timer'
import {ProgramCard} from "entities/program";
import {ActiveProgramItem} from "features/rpogram/active-program";
import {useTranslation} from "react-i18next";

export const ProgramsList: FC<{ programs?: Array<any>, loading: boolean }> = ({programs, loading}) => {
    const { t } = useTranslation()
    const activePrograms = useSelector(TimerSelectors.getActivePrograms)

    return <>
        {
            loading
            && Array.apply(null, new Array(8))
                .map((_, i) => <ProgramCard loading key={i + 1}/>)
        }
        {programs && programs.length === 0 && <Title type={4}
                                                      message={t("project.programs")}
                                                      color={'secondary'}
        />}
        {
            programs && programs.map(p => <ActiveProgramItem key={p.id}
                                                              title={p.name}
                                                              active={activePrograms.includes(p.id)}
                                                              id={p.id}
            />)
        }
    </>
}