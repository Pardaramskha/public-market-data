import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
// Pages
import Home from "./pages/Home";
import PairDetails from "./pages/PairDetails";
// Providers
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
              <Routes>
                  <Route path={"/"} element={<Home />} />
                  <Route path={"/details"} element={<PairDetails />} />
                  <Route path={"/details/:symbol"} element={<PairDetails />} />
              </Routes>
          </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
