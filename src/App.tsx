import React, { PropsWithChildren } from "react";
import Layout from "./components/Layout";
import SwapPage from "./pages/SwapPage";
import ErrorBoundary from "./components/ErrorBoundary";

function App({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <Layout>
        <SwapPage />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
