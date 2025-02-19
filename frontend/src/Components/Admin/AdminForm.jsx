import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const AdminForm = () => {
  const validationSchema = Yup.object().shape({
    name_en: Yup.string().required("Product name (EN) is required"),
    name_fa: Yup.string().required("نام محصول (FA) الزامی است"),
    description_en: Yup.string().required("Description (EN) is required"),
    description_fa: Yup.string().required("توضیحات (FA) الزامی است"),
    information_en: Yup.string().required("Information (EN) is required"),
    information_fa: Yup.string().required("اطلاعات (FA) الزامی است"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
    category: Yup.string().required("Category is required"),
    image: Yup.mixed().required("Product image is required"),
  });

  const formik = useFormik({
    initialValues: {
      name_en: "",
      name_fa: "",
      description_en: "",
      description_fa: "",
      information_en: "",
      information_fa: "",
      price: "",
      category: "",
      image: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitted Values:", values);
    },
  });

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Product Name (EN)</label>
            <input
              type="text"
              name="name_en"
              className="w-full border border-gray-300 p-2 rounded"
              {...formik.getFieldProps("name_en")}
            />
            {formik.touched.name_en && formik.errors.name_en && (
              <p className="text-red-500 text-sm">{formik.errors.name_en}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">نام محصول (FA)</label>
            <input
              type="text"
              name="name_fa"
              className="w-full border border-gray-300 p-2 rounded"
              {...formik.getFieldProps("name_fa")}
            />
            {formik.touched.name_fa && formik.errors.name_fa && (
              <p className="text-red-500 text-sm">{formik.errors.name_fa}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Description (EN)</label>
            <textarea
              name="description_en"
              className="w-full border border-gray-300 p-2 rounded"
              {...formik.getFieldProps("description_en")}
            />
            {formik.touched.description_en && formik.errors.description_en && (
              <p className="text-red-500 text-sm">{formik.errors.description_en}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">توضیحات (FA)</label>
            <textarea
              name="description_fa"
              className="w-full border border-gray-300 p-2 rounded"
              {...formik.getFieldProps("description_fa")}
            />
            {formik.touched.description_fa && formik.errors.description_fa && (
              <p className="text-red-500 text-sm">{formik.errors.description_fa}</p>
            )}
          </div>
        </div>

        {/* Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Information (EN)</label>
            <textarea
              name="information_en"
              className="w-full border border-gray-300 p-2 rounded"
              {...formik.getFieldProps("information_en")}
            />
            {formik.touched.information_en && formik.errors.information_en && (
              <p className="text-red-500 text-sm">{formik.errors.information_en}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">اطلاعات (FA)</label>
            <textarea
              name="information_fa"
              className="w-full border border-gray-300 p-2 rounded"
              {...formik.getFieldProps("information_fa")}
            />
            {formik.touched.information_fa && formik.errors.information_fa && (
              <p className="text-red-500 text-sm">{formik.errors.information_fa}</p>
            )}
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium">Enter The Price</label>
          <input
            type="text"
            name="price"
            className="w-full border border-gray-300 p-2 rounded"
            {...formik.getFieldProps("price")}
          />
          {formik.touched.price && formik.errors.price && (
            <p className="text-red-500 text-sm">{formik.errors.price}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            className="w-full border border-gray-300 p-2 rounded"
            {...formik.getFieldProps("category")}
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="furniture">Furniture</option>
          </select>
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-500 text-sm">{formik.errors.category}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium">Product Image</label>
          <input
            type="file"
            name="image"
            className="w-full border border-gray-300 p-2 rounded"
            onChange={(event) =>
              formik.setFieldValue("image", event.currentTarget.files[0])
            }
          />
          {formik.touched.image && formik.errors.image && (
            <p className="text-red-500 text-sm">{formik.errors.image}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminForm;
