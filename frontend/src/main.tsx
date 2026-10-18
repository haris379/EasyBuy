import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { UserCartProvider } from "./context/UserCart.tsx";
import { LoadingProvider } from "./context/LoadingContext.tsx";
import { Provider } from "react-redux";
import { store } from "./reduxStore/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
      <UserCartProvider>
        <LoadingProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </LoadingProvider>
      </UserCartProvider>
  </BrowserRouter>,
);
