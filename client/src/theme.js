import { createMuiTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const Theme = createMuiTheme({
    palette: {
        primary: {
            main: grey[900]
        },
        secondary: {
            main: grey[500]
        }
    }
});

export default Theme;

