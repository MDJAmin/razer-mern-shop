import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const TextInput = ({ label, name, formik, rtl }) => (
  <div>
    <label
      className={`text-black dark:text-light block text-sm font-medium ${
        rtl ? "text-end" : ""
      }`}
    >
      {label}
    </label>
    <input
      type='text'
      name={name}
      className={`w-full border border-gray-300 p-2 rounded ${
        rtl ? "text-right rtl" : ""
      }`}
      dir={rtl ? "rtl" : "ltr"}
      {...formik.getFieldProps(name)}
    />
    <div className='min-h-5'>
      {formik.touched[name] && formik.errors[name] && (
        <p className={`text-error text-sm ${rtl ? "text-end" : ""}`}>
          {formik.errors[name]}
        </p>
      )}
    </div>
  </div>
);

const TextArea = ({ label, name, formik, rtl }) => (
  <div>
    <label
      className={`text-black dark:text-light block text-sm font-medium ${
        rtl ? "text-end" : ""
      }`}
    >
      {label}
    </label>
    <textarea
      name={name}
      className={`w-full border border-gray-300 p-2 rounded ${
        rtl ? "text-right rtl" : ""
      }`}
      dir={rtl ? "rtl" : "ltr"}
      {...formik.getFieldProps(name)}
    />
    <div className='min-h-5'>
      {formik.touched[name] && formik.errors[name] && (
        <p className={`text-error text-sm ${rtl ? "text-end" : ""}`}>
          {formik.errors[name]}
        </p>
      )}
    </div>
  </div>
);

const SelectInput = ({ label, name, options, formik }) => (
  <div>
    <label className='text-black dark:text-light block text-sm font-medium'>
      {label}
    </label>
    <select
      name={name}
      className='w-full border border-gray-300 p-2 rounded'
      {...formik.getFieldProps(name)}
    >
      <option value=''>Select {label}</option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
    <div className='min-h-5'>
      {formik.touched[name] && formik.errors[name] && (
        <p className='text-error text-sm'>{formik.errors[name]}</p>
      )}
    </div>
  </div>
);

const FileInput = ({ label, name, formik }) => (
  <div>
    <label className='text-black dark:text-light block text-sm font-medium'>
      {label}
    </label>
    <input
      type='file'
      name={name}
      className='w-full border border-gray-300 p-2 rounded bg-light'
      onChange={(event) =>
        formik.setFieldValue(name, event.currentTarget.files[0])
      }
    />
    <div className='min-h-5'>
      {formik.touched[name] && formik.errors[name] && (
        <p className='text-error text-sm'>{formik.errors[name]}</p>
      )}
    </div>
  </div>
);

const AdminForm = () => {
  const [isInactive, setIsInactive] = useState(false);

  const validationSchema = Yup.object().shape({
    name_en: Yup.string().required("Product name is required"),
    name_fa: Yup.string().required("نام محصول الزامی است"),
    description_en: Yup.string().required("Description is required"),
    description_fa: Yup.string().required("توضیحات الزامی است"),
    information_en: Yup.string().required("Information is required"),
    information_fa: Yup.string().required("اطلاعات الزامی است"),
    price_en: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
    price_fa: Yup.number()
      .typeError("قیمت باید عدد باشد")
      .required("قیمت محصول الزامی است"),
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
      price_en: "",
      price_fa: "",
      category: "",
      image: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitted Values:", { ...values, isInactive });
    },
  });

  return (
    <div className='max-w-3xl mx-auto bg-light dark:bg-dark text-dark p-6 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-semibold mb-4 text-dark dark:text-light'>
        Add New Product
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className='space-y-4'
      >
        <div className='grid grid-cols-2 gap-4'>
          <TextInput
            label='Product Name'
            name='name_en'
            formik={formik}
          />
          <TextInput
            label='نام محصول'
            name='name_fa'
            formik={formik}
            rtl
          />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <TextArea
            label='Description'
            name='description_en'
            formik={formik}
          />
          <TextArea
            label='توضیحات محصول'
            name='description_fa'
            formik={formik}
            rtl
          />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <TextArea
            label='Information'
            name='information_en'
            formik={formik}
          />
          <TextArea
            label='اطلاعات محصول'
            name='information_fa'
            formik={formik}
            rtl
          />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <TextInput
            label='Enter The Price'
            name='price_en'
            formik={formik}
          />
          <TextInput
            label='قیمت را وارد کنید '
            name='price_fa'
            formik={formik}
            rtl
          />
        </div>
        <SelectInput
          label='Category'
          name='category'
          options={[
            { value: "electronics", label: "Electronics" },
            { value: "clothing", label: "Clothing" },
            { value: "furniture", label: "Furniture" },
          ]}
          formik={formik}
        />
        <FileInput
          label='Product Image'
          name='image'
          formik={formik}
        />
        <div className='flex items-center justify-between mt-4'>
          <div>
            <input
              type='checkbox'
              checked={isInactive}
              onChange={() => setIsInactive(!isInactive)}
              className='w-5 h-5 ml-2'
            />
            <label className='text-sm font-medium text-dark dark:text-light'>
              You Want This Product to be inactive?
            </label>
          </div>
          <div>
            <button
              type='button'
              className='bg-error text-white p-2 rounded bg-opacity-75 hover:bg-opacity-100'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-dark-green text-white p-2 rounded hover:bg-opacity-75'
            >
              Create Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
