import {FC} from "react";
import Select from 'react-select'
import './Select.scss'

interface ISelect {
    options: any[]
    type?: 'primary' | 'secondary' | 'list'
    size?: 'large' | 'small' | 'medium'
    selectedValue: string
    selectValue: (newValue: string) => void
}


export const SelectInput: FC<ISelect> = (
    {
        options,
        type = 'primary',
        size = 'large',
        selectValue,
        selectedValue
    }) => {

    const config: any = {}
    if (type === 'list') {
        config.menuIsOpen = true
    }
    const onChange = (newValue: any) => {
        selectValue(newValue.value as string)
    }
    const getValue = (value: string) => {
       return  options.find(option => option.value === value)
    }
    return <div className={'select'}
                data-select-type={type}
                data-size={size}
    >
        <Select onChange={onChange}
                classNamePrefix={'custom-select'}
                value={getValue(selectedValue)}
                options={options}
                isSearchable={false}
                data-type={'large'}
                {...config}
        />
    </div>
}