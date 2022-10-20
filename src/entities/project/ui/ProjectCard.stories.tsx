import {ProjectCard} from "./ProjectCard";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    name: 'ProjectCard',
    component: ProjectCard as ComponentMeta<typeof ProjectCard>
}

export const Base: ComponentStory<typeof ProjectCard> = args => <ProjectCard {...args} />

const mockDate = new Date()
mockDate.setHours(12)
mockDate.setMinutes(43)
mockDate.setSeconds(50)

Base.args = {
    data: {
        name: 'СИКНС НГДУ “СургутНефть”',
        priority: 2,
        time: 'mockDate',
        id: 1,
        end_date:    '2020-12-1'
    },
    loading: false

}