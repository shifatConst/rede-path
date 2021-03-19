import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Destination from './components/Destination/Destination';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Booking from './components/Booking/Booking';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h1>email: {loggedInUser.email}</h1>
      <Router>
        <nav className="navbar navbar-light bg-light justify-content-between">
          <Link to="/" className="navbar-brand">Ride Path</Link>
          <Link to="/home"> Home </Link>
          <Link to="/destination"> Destination</Link>
          <Link to="/blog"> Blog </Link>
          <Link to="/contact"> Contact </Link>
          <Link to="/login"> Login </Link>
          {loggedInUser.email}
        </nav>

        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <PrivateRoute path="/destination/:id">
            <Destination></Destination>
          </PrivateRoute>
          <PrivateRoute path="/booking">
            <Booking></Booking>
          </PrivateRoute>
          <Route path="/blog">
            <Blog></Blog>
          </Route>
          <Route path="/contact">
            <Contact></Contact>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
        </Switch>
      </Router>

    </UserContext.Provider>
  );
}

export default App;
