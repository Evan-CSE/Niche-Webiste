import './App.css';
import MenuBar from './components/MenuBar/MenuBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Payment from './components/Payment/Payment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { createContext, useState } from 'react';
import MyOrders from './components/MyOrders/MyOrders';
import ManageOrders from './components/ManageOrders/ManageOrders';
import AdminPage from './components/AdminPage/AdminPage';
import ManageProducts from './components/ManageProducts/ManageProducts';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
import ManageUser from './components/ManageUser/ManageUser';
import AddReview from './components/Reviews/AddReview';
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route exact path='/home'>
            <Home></Home>
          </Route>
          <Route exact path='/products'>
            <Products></Products>
          </Route>
          <Route exact path='/login'>
            <Login></Login>
          </Route>
          <Route exact path='/register'>
            <Register></Register>
          </Route>
          <PrivateRoute exact path='/dashboard'>
            <Dashboard></Dashboard>
          </PrivateRoute>
          <PrivateRoute exact path='/pay'>
            <Payment></Payment>
          </PrivateRoute>
          <PrivateRoute exact path='/myOrder'>
            <MyOrders></MyOrders>
          </PrivateRoute>
          <PrivateRoute exact path='/admin'>
            <AdminPage></AdminPage>
          </PrivateRoute>
          <PrivateRoute exact path='/manageOrders'>
            <ManageOrders></ManageOrders>
          </PrivateRoute>
          <PrivateRoute exact path='/manageProducts'>
            <ManageProducts></ManageProducts>
          </PrivateRoute>
          <PrivateRoute exact path='/placeOrder/:id'>
            <PlaceOrder></PlaceOrder>
          </PrivateRoute>
          <PrivateRoute exact path='/manageUser'>
            <ManageUser></ManageUser>
          </PrivateRoute>
          <PrivateRoute exact path='/addReview'>
            <AddReview></AddReview>
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
