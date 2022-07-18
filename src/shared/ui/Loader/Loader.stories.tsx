import {Loader} from "./Loader";
import {ComponentMeta, ComponentStory} from "@storybook/react";


export default {
    name: 'Loader',
    component: Loader

} as ComponentMeta<typeof Loader>

export const Base: ComponentStory<typeof Loader> = args => <Loader {...args}/>