import 'app/index.scss'
import 'i8next'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport';

export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Global theme for components',
        defaultValue: 'light',
        toolbar: {
            icon: 'globe',
            items: ['light', 'dark'],
        },
    },
};

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    }
    ,
    backgrounds: {
        defaultValue: globalTypes.theme,
        values: [
            {name: 'light', value: '#F3F3F3'},
            {name: 'dark', value: '#0A192B'}
        ]
    }
    ,
    decorators: [Story => <body data-theme={'dark'}><Story/></body>],
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}




const withThemeProvider = (Story, context) => {
    let backgroundColor
    switch (context.globals.theme) {
        case 'light':
            backgroundColor = '#F3F3F3'
            break
        case 'dark':
            backgroundColor = '#0A192B'
            break
    }
    document.documentElement.style.background = backgroundColor;
    document.body.style.background = backgroundColor;
    return (
        <body data-theme={context.globals.theme}>
        <Story {...context} />
        </body>
    )
}
export const decorators = [withThemeProvider];