import {FC, useEffect} from "react";
import s from './ProjectInfo.module.scss'
import {Form, Title} from "shared";
import {useTranslation} from "react-i18next";
import {CircleTimer} from "entities/timer";
import {TimerPlayButton} from "features/editTimer";
import {useChangeProjectDescriptionMutation, useGetProjectQuery} from "../../../entities/project";
import {appUseDispatch, notify} from "../../../app/store";


export const ProjectInfoBlock: FC<{id: number}> = ({id}) => {
    const { t } = useTranslation()
    const {data, isFetching} = useGetProjectQuery(id)
    const [changeDescription, { isError }]= useChangeProjectDescriptionMutation({})
    const dispatch = appUseDispatch()
    useEffect(() => {
        isError
        && dispatch(notify({type: 'error', message: 'Не удалось изменить описание'}))
    }, [isError, dispatch])
    const saveDescription = async (description: string) => {
        await changeDescription({id, description}).unwrap()
    }
    const loading = isFetching
    return <div className={s.project_info_block}>
        <div className={s.project_title}>
            <Title type={1}
                   message={data?.name}
            />
            <div></div>
            <Title type={3}
                   message={t("project.deadline")}
                   loading={loading}
                   color={'secondary'}
            />
            <Title type={3}
                   message={data?.deadline}
            />

        </div>
        <div className={s.project_timer}>
            <CircleTimer/>
            <div>
                <Title type={4} message={'active task'}/>
                <TimerPlayButton size={'large'}/>
            </div>

        </div>
        <div className={s.description_block}>
            <Title type={3}
                   message={t("project.description")}
                   loading={loading}
            />
            <Form.HiddenInput type={'textarea'}
                         defaultText={data?.description || ''}
                         onSave={saveDescription}
            />
        </div>
    </div>
}