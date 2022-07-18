import {Header} from "./Header";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default  {
    name: 'Layout/Header',
    component: Header as ComponentMeta<typeof Header>
}

export const Template: ComponentStory<typeof Header> = args => <Header {...args}/>


