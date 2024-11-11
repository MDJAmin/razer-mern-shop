import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./Utils/PrivateRoute";
import ClientLayout from "./Layouts/ClientLayout";
import AdminLayout from "./Layouts/AdminLayout";
import {
  Home,
  Auth,
  Category,
  ProductDetails,
  Products,
  Card,
  Pockets,
  Profile,
  Search,
  ContactUs,
  NotFound
} from "./Constants/client";
import {
  AddCategory,
  AddProduct,
  AddSlider,
  AddDiscount,
  AddProductVariant,
  AddVariant,
  AdminPanel,
  Comments,
  Users,
} from "./Constants/admin";
import AdminPrivateRoute from "./Utils/AdminPrivateRoute";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/category" element={<Category />} />
          <Route element={<PrivateRoute />}>
            <Route path="/card" element={<Card />} />
            <Route path="/pocket" element={<Pockets />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<ContactUs />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminPanel />} />
            <Route path="product" element={<AddProduct />} />
            <Route path="product-variant" element={<AddProductVariant />} />
            <Route path="variant" element={<AddVariant />} />
            <Route path="category" element={<AddCategory />} />
            <Route path="slider" element={<AddSlider />} />
            <Route path="user" element={<Users />} />
            <Route path="discount" element={<AddDiscount />} />
            <Route path="comment" element={<Comments />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
