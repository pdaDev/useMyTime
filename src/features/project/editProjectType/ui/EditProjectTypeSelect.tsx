import {FC} from "react";
import {getOptionsFromTypes, getTypeValue, ProjectInfoEl} from "../../../../entities/project";
import {HiddenSelect} from "../../../../shared/ui/Form";
import s from './EditProjectTypeSelect.module.scss'

interface EditProjectTypeSelectProps {
    title: string
    types: any[] | undefined
    isOwner: boolean
    type: number | undefined
    saveType: Function
    loading: boolean
}

export const EditProjectTypeSelect: FC<EditProjectTypeSelectProps> = ({
                                                                          title,
                                                                          isOwner,
                                                                          type,
                                                                          types,
                                                                          loading,
                                                                          saveType
                                                                      }) => {
    return <ProjectInfoEl title={title}
                          loading={loading}
    >
        <div className={s.select_wrapper}>
            {
                types && type && <HiddenSelect enableChoose={isOwner}
                                               onSave={saveType}
                                               values={types!}
                                               defaultText={getTypeValue(types, type)!}
                                               getOptionsFunction={getOptionsFromTypes}
                />
            }
        </div>
    </ProjectInfoEl>
}