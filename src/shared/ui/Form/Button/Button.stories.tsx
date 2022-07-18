import {Button} from "./Button";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ProjectsIcon} from "../../Icons";

export default  {
    name: 'Form/Button',
    component: Button as ComponentMeta<typeof Button>,
    argTypes: {
        type: {
            defaultValue: 'primary',
            description: 'Type of Button',
            options: ['primary', 'secondary', 'add'],
            control: {
                type: 'select'
            }
        },
        message: {
            defaultValue: 'click me',
            description: 'button message',
        },
        disabled: {
            description: 'button disabled state',
            defaultValue: false
        }

    }
}

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}/>

export const Primary = Template.bind({})
export const Secondary = Template.bind({})
export const WithIcon = Template.bind ({})


Primary.args = {
    type: 'primary',
}

Secondary.args = {
    type: 'secondary'
}

WithIcon.args = {
    type: 'primary',
    icon: ProjectsIcon
}