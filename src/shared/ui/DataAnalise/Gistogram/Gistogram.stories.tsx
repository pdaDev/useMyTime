import {Gistogram} from "./Gistogram";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    name: 'Analyze/Gistogram',
    component: Gistogram
} as ComponentMeta<typeof Gistogram>

export const Base: ComponentStory<typeof Gistogram> = args => <Gistogram {...args}/>

const mockValues = [
    { x: 1, y: 1 },
    { x: 2, y: 10 },
    { x: 3, y: 2 },
    { x: 4, y: 3 },
    { x: 5, y: 8 },
    { x: 6, y: 12 },
    { x: 7, y: 9 },
    { x: 8, y: 4 },
    { x: 9, y: 5 },
    { x: 10, y: 8 },
    { x: 11, y: 3},
    { x: 12, y: 5},
    { x: 13, y: 6},
    { x: 14, y: 7}
]

Base.args = {
    title: 'Cтатистика работ за последние две недели',
    values: mockValues,
    month: 'февраль',
    countOfValues: 14,
    countOfRows: 5,
    deltaY: 2
}
