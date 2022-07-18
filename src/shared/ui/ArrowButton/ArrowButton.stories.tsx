import {ArrowButton} from "./ArrowButton";
import {ComponentMeta, ComponentStory} from "@storybook/react";


export default  {
    name: 'ArrowButton',
    component: ArrowButton as ComponentMeta<typeof ArrowButton>
}



export const Main: ComponentStory<typeof ArrowButton> = args => <ArrowButton {...args} />
