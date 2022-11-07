import { globalCss } from ".";

export const globalStyle = globalCss({
    '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
    },
    body: {
        backgroundColor: '$grey900',
        color: '$grey100',
        '-webkit-font-smoothing': 'antialiased',

    },
    'body, input, textarea, button': {
        fontFamily: 'Roboto',
        fontWeight: 400,
    }
}
) 