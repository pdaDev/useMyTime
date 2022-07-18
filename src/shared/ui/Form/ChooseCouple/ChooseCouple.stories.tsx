import {ChooseCouple} from "./ChooseCouple";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    name: 'Form/ChooseCouple',
    component: ChooseCouple as ComponentMeta<typeof ChooseCouple>
}

export const Base: ComponentStory<typeof ChooseCouple> = args => <ChooseCouple {...args}/>


Base.args = {
    title: 'Выбор  языка',
    options: [
        {value: 'rus', label: 'рус', handleClick: () => {}},
        {value: 'eng', label: 'енг', handleClick: () => {}}
    ],
    defaultValue: 'rus'
}