import React from "react";

import { AppProps } from "next/app";
import Provider from "../components/Providers";
import Navbar from "../components/Navbar";
import MainPageContainer from "../components/Common/MainPageContainer";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Head>
        <title>Bow Mark</title>
      </Head>
      <Navbar />
      <MainPageContainer>
        <Component {...pageProps} />
      </MainPageContainer>
    </Provider>
  );
}
