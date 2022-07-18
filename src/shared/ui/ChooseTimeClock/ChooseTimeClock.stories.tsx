import {ChooseTimeClock} from "./ChooseTimeClock";
import {ComponentStory, ComponentMeta} from "@storybook/react";


export default  {
    name: 'ChooseTimeClock',
    component: ChooseTimeClock as ComponentMeta<typeof ChooseTimeClock>
}

export const Base: ComponentStory<typeof ChooseTimeClock> = args => <ChooseTimeClock {...args}/>