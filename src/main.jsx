import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "./components/ui/toaster.jsx";
import ConfirmAlert from "@/components/common/confirm-alert.jsx";
import LoadingFullScreen from "@/components/common/loading-fullscreen/index.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ConfirmAlert />
      <LoadingFullScreen />
      <Toaster />
    </Provider>
  </BrowserRouter>
);
