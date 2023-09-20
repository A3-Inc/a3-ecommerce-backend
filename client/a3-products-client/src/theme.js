import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#e8c7fd',
        },
        secondary: {
            main: '#FFFFFF',
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;