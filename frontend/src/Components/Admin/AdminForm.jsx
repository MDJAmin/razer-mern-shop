import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const formatPrice = (value) => {
  return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const TextInput = ({ label, name, formik, rtl, isPrice, lang }) => (
  <div>
    <label
      className={`text-black dark:text-light block text-sm font-medium ${rtl ? "text-end" : ""}`}
    >
      {label}
    </label>
    <input
      type='text'
      name={name}
      className={`w-full border py-2 text-lg ${lang === "fa" ? "rounded-e-xl" : "rounded-s-xl"}`}
      dir={rtl ? "rtl" : "ltr"}
      value={isPrice ? formatPrice(formik.values[name]) : formik.values[name]}
      onChange={(e) => {
        const formattedValue = isPrice ? formatPrice(e.target.value) : e.target.value;
        formik.handleChange(e);
        formik.setFieldValue(name, formattedValue);
      }}
      onBlur={formik.handleBlur}
    />
    <div className='min-h-5'>
      {formik.touched[name] && formik.errors[name] && (
        <p className={`text-error text-sm ${rtl ? "text-end" : ""}`}>{formik.errors[name]}</p>
      )}
    </div>
  </div>
);

const TextArea = ({ label, name, formik, rtl, lang }) => (
  <div>
    <label
      className={`text-black dark:text-light block text-sm font-medium ${
        rtl ? "text-end" : ""
      }`}
    >
      {label}
    </label>
    <textarea
      type='text'
      name={name}
      className={`w-full border text-lg h-11 min-h-[45.5px] ${lang === "fa" ? "rounded-e-xl" : "rounded-s-xl"}`}
      dir={rtl ? "rtl" : "ltr"}
      {...formik.getFieldProps(name)}
    />
    <div className='min-h-5'>
      {formik.touched[name] && formik.errors[name] && (
        <p className={`text-error text-sm ${rtl ? "text-end" : ""}`}>{formik.errors[name]}</p>
      )}
    </div>
  </div>
);

const SelectInput = ({ label, name, options, formik }) => (
  <div>
    <label className='text-black dark:text-light block text-sm font-medium'>{label}</label>
    <select
      name={name}
      className='w-full border border-gray-300 text-xl py-1 rounded-lg'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
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
    <label className='text-black dark:text-light block text-sm font-medium'>{label}</label>
    <input
      type='file'
      name={name}
      className='w-full border border-gray-300 text-lg rounded-lg bg-light'
      onChange={(event) => formik.setFieldValue(name, event.currentTarget.files[0])}
      onBlur={formik.handleBlur}
    />
    <div className='min-h-5'>
      {formik.touched[name] && formik.errors[name] && (
        <p className='text-error text-sm'>{formik.errors[name]}</p>
      )}
    </div>
  </div>
);

const AdminForm = () => {
  const { t } = useTranslation();
  const [isInactive, setIsInactive] = useState(false);
  const { lang } = useSelector((state) => state.i18n);

  const validationSchema = Yup.object().shape({
    name_en: Yup.string().required("Product name is required"),
    name_fa: Yup.string().required("نام محصول الزامی است"),
    description_en: Yup.string().required("Description is required"),
    description_fa: Yup.string().required("توضیحات الزامی است"),
    information_en: Yup.string().required("Information is required"),
    information_fa: Yup.string().required("اطلاعات الزامی است"),
    price_en: Yup.string()
      .matches(/^\d{1,3}(,\d{3})*$/, "Price must be a valid number")
      .required("Price is required"),
    price_fa: Yup.string()
      .matches(/^\d{1,3}(,\d{3})*$/, "قیمت باید عدد معتبر باشد")
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
    <div className='max-w-3xl mx-auto bg-light dark:bg-dark text-dark p-8 rounded-lg shadow-lg'>
      <form
        onSubmit={formik.handleSubmit}
        className='space-y-2'
      >
        <div className='grid grid-cols-2'>
          <TextInput
            label='Product Name'
            name='name_en'
            formik={formik}
            lang={lang}
          />
          <TextInput
            label='نام محصول'
            name='name_fa'
            formik={formik}
            lang={lang}
            rtl
          />
        </div>
        <div className='grid grid-cols-2'>
          <TextArea
            label='Description'
            name='description_en'
            formik={formik}
            lang={lang}
          />
          <TextArea
            label='توضیحات محصول'
            name='description_fa'
            formik={formik}
            lang={lang}
            rtl
          />
        </div>
        <div className='grid grid-cols-2'>
          <TextArea
            label='Information'
            name='information_en'
            formik={formik}
            lang={lang}
          />
          <TextArea
            label='اطلاعات محصول'
            name='information_fa'
            formik={formik}
            lang={lang}
            rtl
          />
        </div>
        <div className='grid grid-cols-2'>
          <TextInput
            label='Enter The Price'
            name='price_en'
            formik={formik}
            lang={lang}
            isPrice
          />
          <TextInput
            label='قیمت را وارد کنید '
            name='price_fa'
            formik={formik}
            lang={lang}
            rtl
            isPrice
          />
        </div>
        <FileInput
          label='Product Image'
          name='image'
          formik={formik}
        />
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
        <div className='flex items-center justify-between gap-10'>
          <div className='flex'>
            <div className='pt-2'>
              <div
                onClick={() => setIsInactive(!isInactive)}
                className={`text-center relative bg-dark dark:bg-light w-12 h-6 flex items-center cursor-pointer rounded-full p-1 transition-colors 
                  ${isInactive ? "bg-red-500" : "bg-green-500"}`}
              >
                <div
                  onClick={() => setIsInactive(!isInactive)}
                  className={`text-center relative w-12 h-6 flex items-center cursor-pointer rounded-full p-1 transition-colors 
    ${isInactive ? "bg-red-500" : "bg-green-500"}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full shadow-md transform transition-transform 
      ${
        isInactive
          ? lang === "fa"
            ? "-translate-x-5"
            : "-translate-x-1"
          : lang === "fa"
          ? "translate-x-1"
          : "translate-x-5"
      } 
      ${isInactive ? "bg-error" : "bg-light-green"}`}
                  ></div>
                </div>
              </div>
            </div>
            <div className='min-w-44 mt-[5px]'>
              <label className='ps-3 text-[10px] font-medium text-dark dark:text-light ml-2'>
                {t("YouWantThisProductToBe")} {isInactive ? t("notActive") : t("active")}
                {lang === "fa" ? "  باشه؟  " : "?"}
              </label>
            </div>
          </div>

          <div className='flex gap-2'>
            <button
              type='button'
              className='bg-error text-white text-lg p-2 rounded bg-opacity-50 hover:bg-opacity-100'
            >
              {t("cancel")}
            </button>
            <button
              type='submit'
              className='bg-dark-green text-lg text-white p-2 rounded bg-opacity-50 hover:bg-opacity-100'
            >
              {t("createProduct")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
