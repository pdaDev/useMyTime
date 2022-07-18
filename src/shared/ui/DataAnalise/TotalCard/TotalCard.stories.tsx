import {ComponentMeta, ComponentStory} from "@storybook/react";
import {TotalCard} from "./TotalCard";

export default {
    name: 'Analyze/TotalCard',
    component: TotalCard,
    argTypes: {
        title: {
            defaultValue: 'Всего',
        },
        totalValue: {
            defaultValue: 36
        },
        measure: {
            defaultValue: 'часов'
        }
    }
} as ComponentMeta<typeof TotalCard>

export const Base:ComponentStory<typeof TotalCard> = args => <TotalCard {...args}/>