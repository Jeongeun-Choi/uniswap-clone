import React, { PropsWithChildren } from "react";
import Layout from "./components/Layout/Layout";

function App({ children }: PropsWithChildren) {
  return <Layout>{children}</Layout>;
}

export default App;
