import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import {blue, orange} from '@material-ui/core/colors';
import TodoList from './components/todos/todos';
import TodoItem from './components/todos/todoitem';
import ElevationScroll from './components/navigations/elevationScroll'

import './App.css';
import 'react-toastify/dist/ReactToastify.css'

const font =  "'Montserrat', sans-serif";

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat'
  },
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
      contrastText: '#fff',
    },
    secondary: {
      light: orange[300],
      main: orange[500],
      dark: orange[700],
      contrastText: '#fff',
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <ElevationScroll />
        <Switch>
          <Route path='/todos/:id' component={TodoItem} />
          <Route path="/todos" component={TodoList} />
          <Route path="/" exact component={TodoList} />
        </Switch>
        {/* <SimpleBottomNavigation /> */}
        </ThemeProvider>
    </>
  );
}

export default App;
