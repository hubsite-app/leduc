import * as React from "react";

import ThemeProvider from "./ThemeProvider";
import MyApolloProvider from "./ApolloProvider";
import { AuthProvider } from "../../contexts/Auth";

export default function Provider(props: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MyApolloProvider>
        <AuthProvider>{props.children}</AuthProvider>
      </MyApolloProvider>
    </ThemeProvider>
  );
}

export function withProvider(WrappedComponent: any) {
  return WrappedComponent;
}
