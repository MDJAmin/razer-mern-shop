import { Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import PrivateRoute from "./Utils/PrivateRoute";
import AdminPrivateRoute from "./Utils/AdminPrivateRoute";
import ClientLayout from "./Layouts/ClientLayout";
import AdminLayout from "./Layouts/AdminLayout";

const Home = lazy(() => import("./Constants/client/Home"));
const Auth = lazy(() => import("./Constants/client/Auth"));
const Category = lazy(() => import("./Constants/client/Category"));
const ProductDetails = lazy(() => import("./Constants/client/ProductDetails"));
const Products = lazy(() => import("./Constants/client/Products"));
const Card = lazy(() => import("./Constants/client/Card"));
const Pockets = lazy(() => import("./Constants/client/Pockets"));
const Profile = lazy(() => import("./Constants/client/Profile"));
const Search = lazy(() => import("./Constants/client/Search"));
const ContactUs = lazy(() => import("./Constants/client/ContactUs"));
const NotFound = lazy(() => import("./Constants/client/NotFound"));

const AddCategory = lazy(() => import("./Constants/admin/AddCategory"));
const AddProduct = lazy(() => import("./Constants/admin/AddProduct"));
const AddSlider = lazy(() => import("./Constants/admin/AddSlider"));
const AddDiscount = lazy(() => import("./Constants/admin/AddDiscount"));
const AddProductVariant = lazy(() => import("./Constants/admin/AddProductVariant"));
const AddVariant = lazy(() => import("./Constants/admin/AddVariant"));
const AdminPanel = lazy(() => import("./Constants/admin/AdminPanel"));
const Comments = lazy(() => import("./Constants/admin/Comments"));
const Users = lazy(() => import("./Constants/admin/Users"));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/categories" element={<Category />} />
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<Card />} />
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
