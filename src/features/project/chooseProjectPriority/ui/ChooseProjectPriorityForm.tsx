import {FC, useRef} from "react";
import {ProjectInfoEl} from "../../../../entities/project";
import s from './ChoosePriority.module.scss'
import {useOpenClose} from "../../../../shared";
import classNames from "classnames";

interface ChooseProjectPriorityFormProps {
    enableEdit: boolean
    savePriority: Function
    priority?: number
    loading: boolean
}

export const ChooseProjectPriorityForm: FC<ChooseProjectPriorityFormProps> = ({
                                                                                  enableEdit,
                                                                                  priority,
                                                                                  savePriority,
                                                                                  loading,
                                                                              }) => {
    const [isFormOpen, open, close] = useOpenClose()
    const handlePriorityClick = () => {
        if (enableEdit) {
            open()
            setTimeout(() => ref.current?.focus(), 50)
        }

    }
    const choosePriority = async (pr: number) => {
        close()
        await savePriority(pr)

    }
    const ref = useRef<HTMLDivElement>(null)
    return <ProjectInfoEl title={'priority'}
                          loading={loading}
    >
        <div className={s.priority_wrapper}
        >
            <div className={classNames(s.priority, s.active)}
                 onClick={handlePriorityClick}
                 data-loading={!priority}
            >
                {priority}
            </div>
            {isFormOpen && <div className={s.choose_priority_form}
                                tabIndex={0}
                                onBlur={close}
                                ref={ref}
            >
                {
                    Array.apply(null, new Array(5))
                        .map((_, i) => <div className={`${s.priority} ${i + 1 === priority && s.active}`}
                                            onClick={() => choosePriority(i + 1)}
                                            key={i + 1}
                    >
                            {i  + 1}
                    </div>)
                }
            </div>}
        </div>
    </ProjectInfoEl>
}