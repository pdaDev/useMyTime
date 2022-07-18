
import {TextInput} from "./TextInput";
import {ComponentMeta, ComponentStory} from "@storybook/react";
export  default  {
    name: 'Form/TextInput',
    component: TextInput as ComponentMeta<typeof TextInput>
}

const Template: ComponentStory<typeof TextInput> = args => <TextInput {...args}/>

export const Text = Template.bind({})
export const Password = Template.bind({})


Text.args = {
    type: 'text'
}
Password.args = {
    type: 'password'
}

