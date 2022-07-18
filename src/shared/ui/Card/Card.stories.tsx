import {Card} from "./Card";
import {ComponentMeta, ComponentStory} from "@storybook/react";

type CardType = typeof Card

export default {
    name: 'Card',
    component: Card as ComponentMeta<CardType>,
    argTypes: {
        width: {
            defaultValue: 500
        },
        height: {
            defaultValue: 300
        }

    }
}

export const Template: ComponentStory<CardType> = args => <Card {...args} />