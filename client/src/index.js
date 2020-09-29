import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from '@material-ui/core/styles';
import Theme from './theme';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

