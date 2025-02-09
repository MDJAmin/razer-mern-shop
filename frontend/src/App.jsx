import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./Utils/PrivateRoute";
import AdminPrivateRoute from "./Utils/AdminPrivateRoute";
import ClientLayout from "./Layouts/ClientLayout";
import AdminLayout from "./Layouts/AdminLayout";
import { PagesLoading } from "./Constants/Components";
import { lazy, Suspense } from "react";

// Client Pages Lazy Loading
const Home = lazy(() => import("./Pages/Home"));
const Auth = lazy(() => import("./Pages/Auth"));
const Category = lazy(() => import("./Pages/Category"));
const ProductDetails = lazy(() => import("./Pages/ProductDetails"));
const Products = lazy(() => import("./Pages/Products"));
const Cart = lazy(() => import("./Pages/Cart"));
const Pockets = lazy(() => import("./Pages/Pockets"));
const Profile = lazy(() => import("./Pages/Profile"));
const Search = lazy(() => import("./Pages/Search"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const NotFound = lazy(() => import("./Pages/NotFound"));
// Admin Pages Lazy Loading 
const AddCategory = lazy(() => import("./Admin/AddCategory"));
const AddProduct = lazy(() => import("./Admin/AddProduct"));
const AddSlider = lazy(() => import("./Admin/AddSlider"));
const AddDiscount = lazy(() => import("./Admin/AddDiscount"));
const AddProductVariant = lazy(() => import("./Admin/AddProductVariant"));
const AddVariant = lazy(() => import("./Admin/AddVariant"));
const AdminPanel = lazy(() => import("./Admin/AdminPanel"));
const Comments = lazy(() => import("./Admin/Comments"));
const Users = lazy(() => import("./Admin/Users"));


export default function App() {
  const { token } = useSelector((state) => state.user);
  
  return (
    <Suspense fallback={<PagesLoading/>}>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/auth"
            element={token ? <Navigate to={"/"} /> : <Auth />}
          />
          <Route path="/product" element={<Products />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/categories" element={<Category />} />
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/pockets" element={<Pockets />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminPanel />} />
            <Route path="products" element={<AddProduct />} />
            <Route path="products/variants" element={<AddProductVariant />} />
            <Route path="variants" element={<AddVariant />} />
            <Route path="categories" element={<AddCategory />} />
            <Route path="sliders" element={<AddSlider />} />
            <Route path="users" element={<Users />} />
            <Route path="discounts" element={<AddDiscount />} />
            <Route path="comments" element={<Comments />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
