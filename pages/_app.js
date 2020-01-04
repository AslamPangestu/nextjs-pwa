import App from "next/app";
import Head from "next/head";
import React from "react";
import { Provider } from "react-redux";
import makeStore from "../redux/store";
import withRedux from "next-redux-wrapper";
import Cookies from "../utils/cookies";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";

let initialRender = false;

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps;
    // Ensure getInitialProps gets called on our child pages
    const locale = Cookies.getStoredLocale(ctx.req); // Retrieve the locale from cookie or headers
    const token = Cookies.getStoredToken(ctx.req); // Retrieve token cookie from req.headers
    // await ctx.store.dispatch(AppActions.startup({ locale })); // Post startup action with token and locale
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    if (!initialRender) {
      initialRender = true;
      const locale = store.getState().locale;
      if (locale) {
        Strings.setLanguage(locale);
      }
    }
    return (
      <Provider store={store}>
        <Head>
          {/*...script and meta tags*/}
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="description" content="The project description" />
          <meta name="theme-color" content="#317EFB" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="apple-touch-icon" href="/static/images/icons-192.png" />
          <link
            rel="icon"
            sizes="192x192"
            href="/static/images/icons-192.png"
          />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="shortcut icon" href="/static/images/favicon.ico" />
          <title>Coba PWA</title>
        </Head>
        <Header />
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withRedux(makeStore)(MyApp);
