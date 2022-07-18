import {FC, useState} from "react";
import s from './ChooseProgramForm.module.scss'
import {Title} from 'shared'
import {Button} from "../../../../shared/ui/Form";

interface IChooseProgramForm {
    type?: 'desktop' | 'mobile',
    close: () => void
}

interface Program {
    id: number,
    name: string
}


export const ChooseProgramForm: FC<IChooseProgramForm> = ({type}) => {

    const programs: Array<Program> = [{id: 0, name: ''}]
    const [selectedPrograms, setProgramInSelected] = useState<number[]>([])
    const selectProgram = (programId: number) => {
        setProgramInSelected([...selectedPrograms, programId])
    }
    const unselectProgram = (programId: number) => {
        setProgramInSelected(selectedPrograms.filter(id => id !== programId))
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
                        programs.map(program => <div className={s.program_wrapper}
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
                        programs.map(program => <div className={s.program_wrapper}
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
                        programs.map(program => <div className={s.program_wrapper}
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
            <Button type={'secondary'} message={'очистить'} size={'small'}/>
            <Button type={'primary'} message={'принять'} size={"small"}/>
        </div>
    </div>
}