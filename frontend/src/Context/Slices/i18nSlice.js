import { createSlice } from "@reduxjs/toolkit";
import i18next from "i18next";
import "../../i18n/translations";

const initialState = {
  lang: localStorage.getItem("lang") || "en",
};

const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      const newLang = action.payload;
      localStorage.setItem("lang", newLang);
      state.lang = newLang;

      if (i18next.isInitialized) {
        i18next.changeLanguage(newLang);
      } else {
        i18next.on("initialized", () => {
          i18next.changeLanguage(newLang);
        });
      }
    },
  },
});

export const { setLanguage } = i18nSlice.actions;
export default i18nSlice.reducer;
