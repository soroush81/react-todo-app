import TodoList from './components/todos/todos';
import TodoItem from './components/todos/todoitem';
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <>
      <div className="App">
        <ToastContainer />
        <Switch>
          <Route path='/todos/:id' component={TodoItem} />
          <Route path="/todos" component={TodoList} />
          <Route path="/" exact component={TodoList} />
        </Switch>
      </div>
    </>
  );
}

export default App;
