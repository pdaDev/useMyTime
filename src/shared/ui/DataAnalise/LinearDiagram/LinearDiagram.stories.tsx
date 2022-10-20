import {LinearDiagram} from "./LinearDiagram";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    name: 'Analyze/LinearGistogram',
    component: LinearDiagram as ComponentMeta<typeof LinearDiagram>
}

export const Base: ComponentStory<typeof LinearDiagram> = args => <LinearDiagram {...args}/>
