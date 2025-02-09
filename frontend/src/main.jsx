import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./Context/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {BrowserRouter} from "react-router-dom"
import {useSelector } from 'react-redux';

const GlobalTheme = () => {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return null;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <BrowserRouter>
        <GlobalTheme />
          <App />
        </BrowserRouter>
      </Provider>
    </PersistGate>
  </StrictMode>
);
