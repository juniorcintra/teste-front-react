import { BrowserRouter } from "react-router-dom";
import { GlobalStoreProvider } from "./store";
import Router from "@/routes/routes";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <GlobalStoreProvider>
      <BrowserRouter basename="/">
        <Router />
        <Toaster />
      </BrowserRouter>
    </GlobalStoreProvider>
  );
}

export default App;
