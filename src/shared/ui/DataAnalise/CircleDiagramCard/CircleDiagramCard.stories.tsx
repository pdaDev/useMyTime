import {ComponentMeta, ComponentStory} from "@storybook/react";
import {CircleDiagramCard} from "./CircleDiagramCard";


export default {
    name: 'Analyse/CircleDiagramCard',
    component: CircleDiagramCard,
    argTypes: {
        title: {
            defaultValue: 'Состояние',
        },
        parts: {
            defaultValue: 52,
        },
        part: {
            defaultValue: 37
        }
    }
} as ComponentMeta<typeof  CircleDiagramCard>

export const Base: ComponentStory<typeof CircleDiagramCard> = args => <CircleDiagramCard {...args}/>