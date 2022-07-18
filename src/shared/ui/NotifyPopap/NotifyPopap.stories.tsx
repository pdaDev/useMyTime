import {NotifyPopapStyled} from "./NotifyModule";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    name: 'NotifyPopap',
    component: NotifyPopapStyled as ComponentMeta<typeof NotifyPopapStyled>
}

const Template: ComponentStory<typeof NotifyPopapStyled> = args => <NotifyPopapStyled {...args}/>
export const Warning = Template.bind({})
export const Error = Template.bind({})
export const Success = Template.bind({})

Warning.args = {
    type: 'warning',
    message: 'Осторожно'
}

Error.args = {
    type: 'error',
    message: 'Внимание, произошла ошибка!'
}

Success.args = {
    type: 'success',
    message: 'Операция выполнена успешно'
}