import React,{useState, useEffect} from 'react'
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import { blue, orange } from '@material-ui/core/colors';
import TodoList from './components/todos/todos';
import TodoItem from './components/todos/todoitem';
import ElevationScroll from './components/navigations/elevationScroll'
import auth from './services/authService'


import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import Login from './components/auth/login';
import Register from './components/auth/register';

const font = "'Montserrat', sans-serif";

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
  const [user, setUser] = useState(null)

  useEffect(() => {
    try {

      setUser(auth.getCurrentUser())
    } catch (ex) {

    }
  }, [])
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <ElevationScroll user={user} />
        <Switch>
          <Route path='/todos/:id' component={TodoItem} user={user} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path="/todos" component={TodoList} user={user} />
          <Route path="/" exact component={TodoList} user={user} />
        </Switch>
      </ThemeProvider>
    </>
  );
}

export default App;
