import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { useTranslations } from 'next-intl';
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { langs } from '../components/layout/navbar';
import Restaurants from "../components/resturant";
import cover from "../public/images/cover.svg";
import { translate } from '../translate';
export default function Home() {
  const t = useTranslations('home');

  const [token, setToken] = useState();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) setToken(token);
    console.log(langs);
  }, []);
  return (
    <>
      <Head>
        <title>{langs === 'en' ? 'Home' : 'الرئيسية'}</title>
      </Head>
      <div className="main" style={{ flexDirection: `${langs === "en" ? "row" : "row-reverse"}` }}>
        <div className="left" style={{ textAlign: `${langs === "en" ? "left" : "right"}` }}>
          <h1>{translate[langs]["homeTitle"]}</h1>
          <p>{translate[langs]["homeSubTitle"]}</p>
          <p>{t('homeTitle')}</p>
          {!token ? (
            <Link href="/signup" >
              {langs === "en" ? <a className="btn-login">
                {" "}
                {translate[langs]["homeButton"]} <ArrowRightOutlined
                  style={{ fontSize: "16px" }}
                />
              </a> : <a className="btn-login">
                {" "}
                <ArrowLeftOutlined
                  style={{ fontSize: "16px" }}
                />{" "}
                {translate[langs]["homeButton"]}
              </a>}

            </Link>
          ) : null}
        </div>
        <div className="right">
          <Image className="cover" src={cover} />
        </div>
      </div>
      <Restaurants />
    </>
  )
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../lang/${locale}.json`)).default
    }
  };
}