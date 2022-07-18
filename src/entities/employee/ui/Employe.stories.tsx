import {EmployeeCard} from "./EmployeeCard";
import {ComponentMeta, ComponentStory} from "@storybook/react";


export default {
    name: 'Employee',
    component: EmployeeCard
} as ComponentMeta<typeof EmployeeCard>

export const Base: ComponentStory<typeof EmployeeCard> = args => <EmployeeCard {...args}/>

Base.args = {
    data: {
        post: 'читальщик',
        name: 'Родион Родионович Родионов',
        dep: 'отдель',
        id: 1
    },
    loading: false
}
