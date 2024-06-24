import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import Login from "./Components/Admin/Authentication/Login";
import AddProduct from "./Components/Admin/Home/AddProduct";
import { useSelector } from "react-redux";
import AdminProductList from "./Components/Admin/Home/AllProducts";
import ProductDetail from "./Components/Admin/Home/ProductDetails";
import EditProduct from "./Components/Admin/Home/EditProduct";
import Home from "./Components/Users/Pages/Home";

function App() {
  const AdminisLoggedin = useSelector((state) => state.AdminAuth.isLoggedin);
  console.log(AdminisLoggedin);
  return (
    <div className="App">
      <Route path="/admin/login">
        <Login />
      </Route>
      {AdminisLoggedin && (
        <div>
          <Route path="/admin/home">
            <Redirect to="/admin/products" />
          </Route>
          <Route path="/admin/add-product">
            <AddProduct />
          </Route>
          <Route path="/admin/products">
            <AdminProductList />
          </Route>
          <Route path="/admin/product/:productId">
            <ProductDetail />
          </Route>
          <Route path="/admin/edit-product/:productId">
            <EditProduct />
          </Route>
        </div>
      )}

      {!AdminisLoggedin && (
        <Route path="/admin/*">
          <Redirect to="/admin/login" />
        </Route>
      )}

      <Route path='/'>
        <Home/>
      </Route>
    </div>
  );
}

export default App;
