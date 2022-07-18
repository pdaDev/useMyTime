import {ActivitiesDiagram} from "./ActivitiesDiagram";
import {ComponentMeta, ComponentStory} from "@storybook/react";


export default {
    name: 'Analyze/ActivitiesDiagram',
    component: ActivitiesDiagram as ComponentMeta<typeof ActivitiesDiagram>
}

export const Base: ComponentStory<typeof ActivitiesDiagram> = args => <ActivitiesDiagram {...args} />

Base.args = {
    title: 'Активности',
    values: [{
        name: 'Photoshoft',
        endpoints: [{
            start: '10:12:30',
            finish: '13:28:20'
        }, {
            start: '13:28:20',
            finish: '15:28:20'
        }]
    },
        {
            name: 'AutoCAD',
            endpoints: [{
                start: '8:30:30',
                finish: '10:28:20'
            }, {
                start: '10:30:00',
                finish:'12:00:00'
            }, {
                start: '13:10:00',
                finish:'14:22:10'
            }, {
                start: '14:48:50',
                finish:'16:30:00'
            }]
        }
    ]
}