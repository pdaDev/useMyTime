import {Title} from "./Title";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    name: 'Title',
    component: Title as ComponentMeta<typeof Title>,
    argTypes: {
        type: {
            defaultValue: 1,
            description: 'Level of Title',
            options: [1, 2, 3, 4, 5,6],
            control: {
                type: 'select'
            }
        },
        message: {
            description: 'value of Title',
            defaultValue: 'title'
        },
        loading: {
            description: 'loading',
            defaultValue: false
        },
    }
}


const Template: ComponentStory<typeof Title> = args => <Title {...args}/>


export const H1 = Template.bind({})
export const H2 = Template.bind({})
export const H3 = Template.bind({})
export const H4 = Template.bind({})
export const H5 = Template.bind({})
export const H6 = Template.bind({})

H1.args = {
    type:1
}
H2.args = {
    type: 2
}
H3.args = {
    type: 3
}
H4.args = {
    type: 4
}
H5.args = {
    type: 5
}
H6.args = {
    type: 6
}