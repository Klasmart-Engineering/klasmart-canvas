import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import './App.css';
import { BoardView } from './components/boardView';
import { Login } from './components/login';


function App() {

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
          <li>
            <Link to="/boards">Boards</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/boards">
          <BoardView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
