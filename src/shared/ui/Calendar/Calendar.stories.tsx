
import {Calendar} from "./Calendar";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    name: 'Calendar',
    component: Calendar as ComponentMeta<typeof Calendar>
}

export const Base: ComponentStory<typeof Calendar> = args => <Calendar {...args}/>