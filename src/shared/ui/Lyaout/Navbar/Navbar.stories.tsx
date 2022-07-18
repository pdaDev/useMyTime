import {Navbar} from "./Navbar";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default  {
    name: 'Layout/Navbar',
    component: Navbar
} as ComponentMeta<typeof Navbar>

export const Base: ComponentStory<typeof Navbar> = args => <Navbar {...args}/>