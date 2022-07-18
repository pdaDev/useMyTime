import {ErrorBoundaryStyled} from "./ErrorBoundaryStyled";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default  {
    name: 'ErrorBoundary',
    component: ErrorBoundaryStyled as ComponentMeta<typeof ErrorBoundaryStyled>,
    argTypes: {
        errorCode: {
            defaultValue: 404
        },
        errorMessage: {
            defaultValue: 'Упс! Произошла ошибка'
        }
    }
}

export const Main: ComponentStory<typeof ErrorBoundaryStyled> = args => <ErrorBoundaryStyled {...args}/>