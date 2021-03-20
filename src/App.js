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
// import Booking from './components/Booking/Booking';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {/* <h1>email: {loggedInUser.email}</h1> */}
      <Router>
        <nav className="container navbar navbar-expand-lg navbar-light nav-style ">
          {/* <a class="navbar-brand" href="#">Navbar</a> */}
          <Link to="/" className="navbar-brand brand-style">Ride Path</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/home"> Home </Link>
              </li>

              <li className="nav-item active">
                <Link className="nav-link" to="/blog"> Blog </Link>
              </li>

              <li className="nav-item active">
                <Link class="nav-link" to="/contact"> Contact </Link>
              </li>

              <li className="nav-item active">
                <Link class="nav-link" to="/login"> Login </Link>
              </li>
            </ul>
          </div>
          {loggedInUser.name}
        </nav>
        {/* <nav className=" container navbar navbar-light nav-style justify-content-between">
          <Link to="/" className="navbar-brand brand-style">Ride Path</Link>
          <div className="px-5 nav-link-style">
            <div className="nav-item">
              <Link to="/home"> Home </Link>
            </div>
            <div className="nav-item">
              <Link to="/blog"> Blog </Link>
            </div>
            <div className="nav-item">
              <Link to="/contact"> Contact </Link>
            </div>
            <div className="nav-item">
              <Link to="/login"> Login </Link>
            </div>

          </div>
          {loggedInUser.name}
        </nav> */}

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
