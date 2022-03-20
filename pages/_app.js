import ProgressBar from "@badrap/bar-of-progress";
import 'antd/dist/antd.css';
import "devextreme/dist/css/dx.light.css";
import { NextIntlProvider } from 'next-intl';
import Router from "next/router";
// import 'scheduler-react/lib/css/style.css';
import Layout from '../components/layout/layout';
import '../styles/globals.scss';
const progress = new ProgressBar({
  size: 3,
  color: "#FB4B53",
  className: "bar-of-progress",
  delay: 100,
});
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);
function MyApp({ Component, pageProps }) {
  return (
     <NextIntlProvider messages={pageProps.messages}>
     <Layout>
      <Component {...pageProps} />
      </Layout>
      </NextIntlProvider>
      )
}

export default MyApp
