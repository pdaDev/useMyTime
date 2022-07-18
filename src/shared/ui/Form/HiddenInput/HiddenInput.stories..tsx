import {HiddenInput} from "./HiddenInput";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    name: 'Form/HiddenInput',
    component: HiddenInput as ComponentMeta<typeof HiddenInput>,
    argTypes: {
        defaultText: {
            defaultValue: 'text'
        }
    }
}

const Template: ComponentStory<typeof HiddenInput> = args => <HiddenInput {...args} />

export const Input = Template.bind({})
export const Textarea = Template.bind({})

Input.args = {
    type: 'input'

}
Textarea.args = {
    type: 'textarea'
}