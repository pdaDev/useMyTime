import {FC, useState} from "react";
import s from './ChooseProgramForm.module.scss'
import {Loader, Title, useError, useNotify} from 'shared'
import {Button} from "../../../../shared/ui/Form";
import {useGetAllProgramsQuery, useSetProgramsForProjectMutation} from "../../../../entities/project";

interface IChooseProgramForm {
    type?: 'desktop' | 'mobile',
    close: () => void
    projectId: number
}

export const ChooseProgramForm: FC<IChooseProgramForm> = ({type, close, projectId}) => {

    const {data: programs, error, isLoading} = useGetAllProgramsQuery()
    useError(error)
    const [selectedPrograms, setProgramInSelected] = useState<number[]>([])
    const [setPrograms, {isError}] = useSetProgramsForProjectMutation()
    const saveChanges = async () => {
        if (selectedPrograms.length > 0) {
            await setPrograms({id: projectId, programs: selectedPrograms})
        }
        close()

    }
    const selectProgram = (programId: number) => {
        setProgramInSelected([...selectedPrograms, programId])
    }
    useNotify(isError, 'Не удалось добавить программы к проекту', 'error')
    const unselectProgram = (programId: number) => {
        setProgramInSelected(selectedPrograms.filter(id => id !== programId))
    }
    if (isLoading) {
        return <div className={s.choose_program_form} data-form-type={type}>
            <Loader type={'block'}/>
        </div>
    }
    return <div className={s.choose_program_form} data-form-type={type}>
        <div className={s.titles}>
            <Title type={3} message={'Выбор программы'}/>
            <Title type={3} message={'Выбранные программы'}/>
        </div>
        {type === 'desktop' ?
            <div className={s.containers}>
                <div className={s.program_container}>
                    {
                       programs && programs.map(program => <div className={s.program_wrapper}
                                                     data-show={!selectedPrograms.includes(program.id)}
                                                     key={program.id}
                        >
                            <div className={s.program}

                            >
                                <Title type={6} message={program.name}/>
                                <button className={s.button} data-button-type={'select'} onClick={() => selectProgram(program.id)}/>
                            </div>
                        </div>)
                    }
                </div>
                <div className={s.program_container}>
                    {
                      programs && programs.map(program => <div className={s.program_wrapper}
                                                     data-show={selectedPrograms.includes(program.id)}
                                                     key={program.id}
                        >
                            <div className={s.program}

                            >
                                <Title type={6} message={program.name}/>
                                <button className={s.button} data-button-type={'unselect'}  onClick={() => unselectProgram(program.id)}/>
                            </div>
                        </div>)
                    }
                </div>
            </div>

            :  <div className={s.containers}>
                <div className={s.program_container}>
                    {
                       programs && programs.map(program => <div className={s.program_wrapper}
                                                     data-show={true}
                                                     key={program.id}
                        >
                            <div className={s.program}
                            >
                                <button className={s.button} data-button-type={'select'} data-show={!selectedPrograms.includes(program.id)} onClick={() => selectProgram(program.id)}/>
                                <Title type={6} message={program.name}/>
                                <button className={s.button} data-button-type={'unselect'} data-show={selectedPrograms.includes(program.id)} onClick={() => unselectProgram(program.id)}/>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        }

        <div className={s.buttons}>
            <Button type={'secondary'}
                    message={'отменить'}
                    size={'small'}
                    onClick={close}
            />
            <Button type={'primary'}
                    message={'принять'}
                    size={"small"}
                    onClick={saveChanges}
            />
        </div>
    </div>
}