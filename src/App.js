import React, { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import { blue, orange } from '@material-ui/core/colors';
import TodoList from './components/todos/todos';
import TodoItem from './components/todos/todoitem';
import ElevationScroll from './components/navigations/elevationScroll'
import auth from './services/authService'
import UserContext from './context/userContext'
import { getCategories } from './services'
import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Register from './components/auth/register';
import CategoryContext from './context/categoryContext';


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
  const [user, setUser] = useState(auth.getCurrentUser())
  const [categories, setCategories] = useState([])
  const populateCatgeories = async () => {
      await getCategories().then(cats => {
        setCategories(cats)
      })
  }
  useEffect(() => {
      async function fetchData(){
        setUser(auth.getCurrentUser())
        if (window.location.pathname !== '/login' ) 
          await populateCatgeories();
      }
      fetchData();
  }, [])
  return (
    <>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={user}>
        <CategoryContext.Provider value={categories}>
          <ToastContainer />
          <ElevationScroll />
          <Switch>
            <Route path='/todos/?filter=today' component={TodoList} />
            <Route path='/todos/:id' component={TodoItem} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/todos" component={TodoList} />
            <Route path="/" exact component={TodoList} />
          </Switch>
        </CategoryContext.Provider>
        </UserContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
