import * as React from "react";

import ThemeProvider from "./ThemeProvider";
import MyApolloProvider from "./ApolloProvider";
import { AuthProvider } from "../../contexts/Auth";
import { SystemProvider } from "../../contexts/System";

export default function Provider(props: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MyApolloProvider>
        <SystemProvider>
          <AuthProvider>{props.children}</AuthProvider>
        </SystemProvider>
      </MyApolloProvider>
    </ThemeProvider>
  );
}

export function withProvider(WrappedComponent: any) {
  return WrappedComponent;
}
