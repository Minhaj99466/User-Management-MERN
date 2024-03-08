import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Store, Persistor } from "./redux/Store.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@material-tailwind/react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={Persistor}>
      <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <ThemeProvider>
        <App />
      
      </ThemeProvider>
    </React.StrictMode>
    </QueryClientProvider>
    </PersistGate>
    </Provider >
);