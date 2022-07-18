import {ComponentMeta, ComponentStory} from "@storybook/react"
import { ProgramCard } from "./ProgramCard"


export default {
    name: 'ProgramCard',
    component: ProgramCard
} as ComponentMeta<typeof ProgramCard>

export const Base: ComponentStory<typeof  ProgramCard> = args => <ProgramCard {...args} />

Base.args = {
    loading: false,
    data: {
        id: 1,
        active: false,
        title: 'Photoshop'
    }
}

