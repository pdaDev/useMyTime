

import {ComponentMeta, ComponentStory} from "@storybook/react";
import {DialogMenu} from "./DialogMenu";

export default {
    name: 'Dialog',
    component: DialogMenu as ComponentMeta<typeof DialogMenu>
}
export const Base: ComponentStory<typeof DialogMenu> = args => <DialogMenu {...args} />