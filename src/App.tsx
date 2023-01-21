import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import PairDetails from "./pages/PairDetails";

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
          <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
