import {ContactCard} from "./ContactCard";
import {ComponentMeta, ComponentStory} from "@storybook/react";




export default {
    name: 'ContactCard',
    component: ContactCard as ComponentMeta<typeof ContactCard>
}

export const Base: ComponentStory<typeof ContactCard> = args => <ContactCard {...args}/>

Base.args = {
    email: 'mike@mail.npptec.ru',
    phoneNumber: '+7 3882 999 1482',
    name: 'Семенов Михаил Николаевич',
    post: 'Лицензирование'
}