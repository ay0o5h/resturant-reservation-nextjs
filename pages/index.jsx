import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { useTranslations } from 'next-intl';
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { langs } from '../components/layout/navbar';
import Restaurants from "../components/resturant";
import cover from "../public/images/cover.svg";

export default function Home() {
  const t = useTranslations('home');
  const { locale, locales, defaultLocale, asPath } = useRouter();

  const [token, setToken] = useState();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) setToken(token);
    console.log(langs);
  }, []);
  return (
    <>
      <Head>
        <title>{locale === 'en' ? 'Home' : 'الرئيسية'}</title>
      </Head>
      <div className="main" style={{ flexDirection: `${locale === "en" ? "row" : "row-reverse"}` }}>
        <div className="left" style={{ textAlign: `${locale === "en" ? "left" : "right"}` }}>
          <h1>{t("homeTitle")}</h1>
          <p>{t("homeSubTitle")}</p>
          {/* <p>{t('homeTitle')}</p> */}
          {!token ? (
            <Link href="/signup" >
              {locale === "en" ? <a className="btn-login">
                {" "}
                {t("homeButton")} <ArrowRightOutlined
                  style={{ fontSize: "16px" }}
                />
              </a> : <a className="btn-login">
                {" "}
                <ArrowLeftOutlined
                  style={{ fontSize: "16px" }}
                />{" "}
                {t("homeButton")}
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