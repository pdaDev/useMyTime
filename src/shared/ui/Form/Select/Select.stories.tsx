
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { SelectInput} from "./Select";

export default {
    name: 'Form/Select',
    component: SelectInput as ComponentMeta<typeof SelectInput>
}

export const Base: ComponentStory<typeof SelectInput> = (args) => <SelectInput {...args} />

Base.args = {
    options: [
        {value: 'priority', label: 'приритету'},
        {value: 'name', label: 'имени'},
        {value: 'time', label: 'времени'}
    ]
}
