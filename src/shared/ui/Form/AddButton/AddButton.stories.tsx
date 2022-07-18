
import {AddButton} from "./AddButton";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default  {
    name: 'Form/ADdButton',
    component: AddButton as ComponentMeta<typeof AddButton>,
    argTypes: {
        size: {
            defaultValue: 'medium'
        },
        floating: {
            defaultValue: true
        }
    }
}

export const Base:ComponentStory<typeof AddButton> = args => <AddButton {...args}/>