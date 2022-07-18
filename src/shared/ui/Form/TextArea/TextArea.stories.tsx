import {TextArea} from "./TextArea";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    name: 'Form/TextArea',
    component: TextArea as ComponentMeta<typeof TextArea>
}

export const Main: ComponentStory<typeof TextArea> = args => <TextArea {...args}/>