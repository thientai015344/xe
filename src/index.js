import React from "react";
const ReactDOM = require('react-dom/client');
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

  <BrowserRouter>
    <Switch>

      <Route path="/admin" render={(props) => sessionStorage.getItem("userId") != null ? <AdminLayout {...props} /> : <AuthLayout />} />
      <Redirect exact from="/" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>

);
