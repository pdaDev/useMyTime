import s from './Table.module.scss'
import {FC, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Form, Title} from '..';
import {SelectInput} from "../Form";
import {Icons, useNotifyFunction} from 'shared'
import {useOptionsFromArray} from "../../lib";

type d = { [key: string]: any } & { id: number }
export type IData = d[]


interface TableProps {
    headers: string[]
    data: IData
    prefix: string
    createEl: Function
    patchEl: Function
    fetching: boolean
    deleteEl: Function
}


export const Table: FC<TableProps> = ({data, prefix, headers, patchEl, createEl, fetching, deleteEl}) => {
    const {t} = useTranslation()
    const initFocusedInput = {id: -1, key: ''}
    const [focusedInput, setFocusedInput] = useState<{ id: number, key: string }>(initFocusedInput)
    const [state, setState] = useState<TableProps['data']>(data)
    useEffect(() => {
        setWasChangedArray([])
        setFocusedInput(initFocusedInput)
        setState(data)
        // eslint-disable-next-line
    }, [data])
    const [wasChanged, setWasChangedArray] = useState<number[]>([])
    const markAsChanged = (id: number) => setWasChangedArray([...wasChanged, id])
    const [searchState, setSearchState] = useState<string>('')
    const keys = headers
    const [srt, set] = useState<any>(() => {
        const obj: any = {}
        keys.map(key => obj[key] = false)
        return obj
    })
    const sorting = (a: any, b: any, key: string, reverse: boolean) => {
        if (typeof a[key] === "string") {
            return reverse ? b[key].charCodeAt(0) - a[key].charCodeAt(0) : a[key].charCodeAt(0) - b[key].charCodeAt(0)
        } else {
            return reverse ? b[key] - a[key] : a[key] - b[key]
        }
    }
    const deleteValue = (id: number) => {
        setState(state.filter(obj => obj.id !== id))
    }
    const sortBy = (key: string) => {
        set({...srt, [key]: !srt[key]})
        setState([...state].sort((a: any, b: any) => sorting(a, b, key, srt[key])))

    }
    const addRow = () => {
        const obj: any = {}
        keys.map(key => obj[key] = '')
        if (data.length > 0) {
            obj.id = (Math.max(state[state.length - 1].id, data[data.length - 1].id)) + 1
        } else if (state.length > 0) {
            obj.id = state[state.length - 1].id + 1
        } else obj.id = 1
        setState([...state, obj])
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchState(e.target.value)
    }
    const reset = () => {
        setState(data)
        setFocusedInput(initFocusedInput)
        setSearchState('')
    }
    const searchOptions = useOptionsFromArray(keys, prefix)
    const [searchSelect, setSearchSelect] = useState<string>(keys[0])

    const toString = (data: string | number) => {
        if (typeof data === 'string') {
            return data
        }
        return data.toString()
    }
    const [textValue, setTextValue] = useState<string>('')

    const onBlur = (id: number, key: string) => {
        const selectedObj = state.find(o => o.id === id)!
        if (selectedObj[key] !== textValue) {
            markAsChanged(id)
            setState(state.map(obj => obj.id !== id ? obj : {...obj, [key]: textValue.trim()}))
        }
        setTextValue('')
        setFocusedInput(initFocusedInput)
    }
    const onFocus = (textValue: string, id: number, key: string) => {
        setTextValue(textValue)
        setFocusedInput({key, id})

    }
    const onTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextValue(e.target.value)
    }

    const notify = useNotifyFunction('Пожалуйста, заполните все поля', 'warning')
    const submit = () => {
        const uniqueChangedId: number[] = [...new Set(wasChanged) as any]
        const allStateId = state.map(obj => obj.id)
        const allDataId = data.map(obj => obj.id)
        let newELs = state.filter(obj => !allDataId.includes(obj.id))
        const deletedEls = allDataId.filter(id => !allStateId.includes(id))
        let changedEls = uniqueChangedId
            .filter(id => !deletedEls.includes(id) && !newELs.map(obj => obj.id).includes(id))
            .map(id => state.find(obj => obj.id === id)!)

        if ([...changedEls, ...newELs].every(obj => keys.every(key => !!obj[key]))) {
            console.log(newELs, deletedEls, changedEls)
            newELs.forEach(obj => {
                const {id, ...copy} = obj
                createEl(copy)
            })
            deletedEls.forEach(id => {
                deleteEl(id)
            })
            changedEls.forEach(obj => {
                const {id, ...copy} = obj
                patchEl({id, body: copy})
            })
        } else notify()
    }
    const isFocused = (id: number, key: string) => {
        return id === focusedInput.id && key === focusedInput.key
    }


    return <div className={s.table_container}>
        <div className={s.search_block}>
            <input value={searchState}
                   placeholder={t("dataManagement.find")}
                   onChange={onChange}/>
            <div className={s.select}>
                <Title type={4}
                       message={t("dataManagement.findBy")}
                />
                <SelectInput options={searchOptions}
                             selectedValue={searchSelect}
                             selectValue={setSearchSelect}
                             size={'small'}
                             type={'secondary'}
                />
            </div>

        </div>
        <table>
            <thead>
            <tr>
                <th/>
                {keys.map((key) => <th key={key}
                                       onClick={() => sortBy(key)}
                >
                    {t(`${prefix}.${key}`)}
                </th>)}
            </tr>
            </thead>
            <tbody>
            {state.length > 0 && state
                .filter(obj => toString(obj[searchSelect]).toLowerCase().includes(searchState.toLowerCase()))
                .map(obj => <tr key={obj.id}>

                    <div className={s.delete_button}
                         onClick={() => deleteValue(obj.id)}
                    >
                        <img src={Icons.PlusIcon} alt="delete"/>
                    </div>

                    {
                        keys.map(key => <td key={key} className={`${!obj[key] && s.error}`}>
                            <input value={isFocused(obj.id, key) ? textValue : obj[key]}
                                   onFocus={() => onFocus(obj[key], obj.id, key)}
                                   onChange={onTextInputChange}
                                   onBlur={() => onBlur(obj.id, key)}
                            />
                        </td>)
                    }

                </tr>)}

            </tbody>
        </table>
        <div className={s.add_button_container}>
            <Form.AddButton size={'small'}
                            handleClick={addRow}
                            floating

            />
        </div>
        <div className={s.buttons_block}>
            <Form.Button type={'secondary'}
                         message={t("form.decline")}
                         size={'small'}
                         onClick={reset}
            />
            <Form.Button type={'primary'}
                         message={t("form.accept")}
                         size={'small'}
                         disabled={fetching}
                         onClick={submit}
            />
        </div>
    </div>
}