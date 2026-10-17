import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { CartProvider } from "./context/Cart.tsx";
import { UserCartProvider } from "./context/UserCart.tsx";
import { LoadingProvider } from "./context/LoadingContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CartProvider>
      <UserCartProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </UserCartProvider>
    </CartProvider>
  </BrowserRouter>,
);
