import {Paginator} from './Paginator'
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    name: 'Paginator',
    component: Paginator as ComponentMeta<typeof Paginator>
}
export const Base: ComponentStory<typeof Paginator> = args => <Paginator {...args} />


Base.args = {
    countOfPages: 20,
    currentPage: 1
}