import React from "react";

import { AppProps } from "next/app";
import Provider from "../components/Providers";
import Navbar from "../components/Navbar";
import MainPageContainer from "../components/Common/MainPageContainer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Navbar />
      <MainPageContainer>
        <Component {...pageProps} />
      </MainPageContainer>
    </Provider>
  );
}
