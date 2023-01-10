import type { AppProps } from "next/app";
// import { useEffect } from "react";
// import { setAppElement } from "react-modal";
import { Footer } from "shared/components/common/Footer/Footer";
import { Header } from "shared/components/common/Header/Header";
import "../styles/globals.css";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { contentstackParams } from "../src/contentstackParams";

ContentstackLivePreview.init({
  enable: true,
  ssr: true,
  stackDetails: {
    apiKey: contentstackParams.apiKey,
  },
});

function MyApp({
  Component,
  pageProps,
}: AppProps<{ noHeaderAndFooter?: boolean }>) {
  // useEffect(() => {
  //   setAppElement("#modalContainer");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const pageContent = <Component {...pageProps} />;

  return (
    <div id="shopstory-example">
      {!pageProps.noHeaderAndFooter && (
        <>
          <Header />
          {pageContent}
          <Footer />
        </>
      )}

      {pageProps.noHeaderAndFooter && pageContent}

      {/* <div id={"modalContainer"} /> */}
      <div id={"toastContainer"} />
    </div>
  );
}

export default MyApp;