
import {CircleDiagram} from "./CircelDiagram";
import {ComponentStory, ComponentMeta} from "@storybook/react";



export default {
    name: 'Analyze/CircleDiagram',
    component: CircleDiagram,
    decorators: [Story => <div style={{width: '100px'}}><Story/></div>],
    argTypes: {
        parts: {
            defaultValue: 10
        },
        part: {
          defaultValue: 5
        }
    }
}  as ComponentMeta<typeof CircleDiagram>

export const Template: ComponentStory<typeof CircleDiagram> = args => <CircleDiagram {...args}/>
