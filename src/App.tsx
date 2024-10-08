import { BrowserRouter } from "react-router-dom";
import { GlobalStoreProvider } from "./store";
import Router from "@/routes/routes";

function App() {
  return (
    <GlobalStoreProvider>
      <BrowserRouter basename="/">
        <Router />
      </BrowserRouter>
    </GlobalStoreProvider>
  );
}

export default App;
