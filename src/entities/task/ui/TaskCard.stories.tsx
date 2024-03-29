import {TaskCard} from "./TaskCard";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    name: 'TaskCard',
    component: TaskCard
} as ComponentMeta<typeof TaskCard>


export const Base: ComponentStory<typeof TaskCard> = args => <TaskCard {...args}/>

