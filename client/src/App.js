import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import DashBoard from "./pages/user/DashBoard";
import Protected from "./components/routes/Protected";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoutes from "./components/routes/AdminRoutes";
import AdminDashboard from "./Admin/AdminDashboard";
import CreateCategory from "./Admin/CreateCategory";
import CreateProduct from "./Admin/CreateProduct";
import Users from "./Admin/Users";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Product from "./Admin/Product";
import UpdateProduct from "./Admin/UpdateProduct";
import Search from "./pages/user/Search";
import ProductDetails from "./pages/ProductDetails";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetails />} />

        <Route path="/dashboard" element={<Protected />}>
          <Route path="user" element={<DashBoard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/order" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />

          <Route path="admin/products" element={<Product />} />

          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
