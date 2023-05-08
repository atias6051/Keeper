import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SideBar from "./components/SideBar";
import SignUpPage from "./components/SingUpPage";
import Customers from "./components/Customers";
import Dashboard from "./components/Dashboard";
import Services from "./components/Services";
import ComapnyPage from "./components/CompanyPage";
import Estimates from "./components/Estimates";
import NewCompanySignup from "./components/NewCompanySignup";
import Invoices from "./components/Invoices";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path="/">
          <SignUpPage/>
        </Route>
        <Route path="/signup">
          <NewCompanySignup/>
        </Route>
        <Route path='/dashboard'>

        {isLoaded && (
          <div id="main-page">
            <SideBar />
            <Switch>
              <Route exact path="/dashboard" >
                <Dashboard />
              </Route>
              <Route path="/dashboard/company" >
                <ComapnyPage />
              </Route>
              <Route path="/dashboard/customers">
                <Customers />
              </Route>
              <Route path="/dashboard/services">
                <Services />
              </Route>
              <Route path="/dashboard/estimates">
                <Estimates />
              </Route>
              <Route path="/dashboard/invoices">
                <Invoices />
              </Route>
            </Switch>
          </div>
        )}
        </Route>
      </Switch>
    </>
  );
}

export default App;
