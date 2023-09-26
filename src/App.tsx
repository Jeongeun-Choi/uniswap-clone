import React, { PropsWithChildren } from "react";
import Layout from "./components/Layout";
import SwapPage from "./pages/SwapPage";

function App({ children }: PropsWithChildren) {
  return (
    <Layout>
      <SwapPage />
    </Layout>
  );
}

export default App;
