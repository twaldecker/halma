import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#292929',
    },
    text: {
      primary: '#fff',
      secondary: '#ccc'
    }
  },
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`,
  },
  overrides: {
    MuiLink: {
      root: {
        color: '#fff',
      }
    }
  }
});

export default theme
