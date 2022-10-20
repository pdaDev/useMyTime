import {FC, useEffect, useMemo} from "react";
import {useGetDirectionTypeOfProjectsQuery, useGetTypesOfProjectQuery} from "../../../../entities/project";
import {Form, Title, useError} from "../../../../shared";
import {useTranslation} from "react-i18next";
import s from './CreateProject.module.scss'


interface OptionsBlockProps {
    registerInput: Function
    typeOfProject: string
    typeOfDirection: string
    setTypeOfProject: (newValue: string) => void
    setDirectionType: (newValue: string) => void
    error?: string
    hasOrder: boolean
}

export const OptionsBlock: FC<OptionsBlockProps> = ({
                                                        registerInput,
                                                        setTypeOfProject,
                                                        typeOfProject,
                                                        typeOfDirection,
                                                        setDirectionType,
                                                        hasOrder,
                                                        error
                                                    }) => {
    const {data: directionTypes, error: getDirectionTypeError} = useGetDirectionTypeOfProjectsQuery()
    const {data: projectTypes, error: getTypeError} = useGetTypesOfProjectQuery()
    const {t} = useTranslation()
    useError([getDirectionTypeError, getTypeError])
    const typesOfProjectOptions = useMemo(() => {
        if (projectTypes) {
            return projectTypes.map(type => ({
                value: type.id.toString(),
                label: type.abbreviation
            }))
        }
        return [{value: '', label: ''}]
    }, [projectTypes])
    const typesOfDirectionsOptions = useMemo(() => {
        if (directionTypes) {
            return directionTypes.map(type => ({
                value: type.id.toString(),
                label: type.abbreviation
            }))
        }
        return [{value: '', label: ''}]
    }, [directionTypes])
    useEffect(() => {
        projectTypes && projectTypes.length > 0 && setTypeOfProject(projectTypes[0].id.toString())
        directionTypes && directionTypes.length > 0 && setDirectionType(directionTypes[0].id.toString())
        // eslint-disable-next-line
    }, [projectTypes, directionTypes])

    return <div className={s.options_block}>
        <div className={s.type_block}>
            <div>
                <Title type={3}
                       message={t("createProject.typeOfProject")}
                       weight={'medium'}
                />
                <Form.SelectInput
                    type={'primary'}
                    size={'small'}
                    options={typesOfProjectOptions}
                    selectedValue={typeOfProject}
                    selectValue={setTypeOfProject}
                />
            </div>
            {hasOrder && <div className={s.order_container}>
                <Title type={3}
                       message={t("createProject.order")}
                       weight={"medium"}
                />
                <Form.TextInput type={'text'}
                                registerEl={registerInput('order', {required: t("form.required")})}
                                config={{placeholder: t("createProject.order")}}
                                size={'small'}
                                validationType={'placeholder'}
                                error={error}
                />
            </div>
            }
        </div>

        <div>
            <Title type={3}
                   message={t("createProject.typeOfDirection")}
                   weight={'medium'}
            />
            <Form.SelectInput
                type={'primary'}
                size={'small'}
                options={typesOfDirectionsOptions}
                selectedValue={typeOfDirection}
                selectValue={setDirectionType}
            />
        </div>


    </div>
}
