import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Login from "./Components/Admin/Authentication/Login";
import UserLogin from "./Components/Users/Authentication/Login";
import AddProduct from "./Components/Admin/Home/AddProduct";
import AdminHome from "./Components/Admin/Home/Home";
import ProductDetail from "./Components/Admin/Home/ProductDetails";
import ProductDetailPage from "./Components/Users/Pages/ProductDetails";
import EditProduct from "./Components/Admin/Home/EditProduct";
import Home from "./Components/Users/Pages/Home";
import Signup from "./Components/Users/Authentication/Signup";
import Orders from "./Components/Admin/Home/Orders";

function App() {
  const AdminisLoggedin = useSelector((state) => state.AdminAuth.isLoggedin);
  console.log(AdminisLoggedin);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" exact>
          <UserLogin />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/product/:productId" component={ProductDetailPage} />

        <Route path="/admin/login" component={Login} />

        {AdminisLoggedin ? (
          <>
            <Route exact path="/admin/home">
              <Redirect to="/admin/products" />
            </Route>
            <Route path="/admin/add-product" component={AddProduct} />
            <Route path="/admin/products" component={AdminHome} />
            <Route path="/admin/product/:productId" component={ProductDetail} />
            <Route
              path="/admin/edit-product/:productId"
              component={EditProduct}
            />
            <Route path='/admin/orders' >
              <Orders/>
            </Route>
          </>
        ) : (
          <Route path="/admin/*">
            <Redirect to="/admin/login" />
          </Route>
        )}

        <Route path="*">
          <Redirect to="/" />
        </Route>

        
      </Switch>
    </div>
  );
}

export default App;
