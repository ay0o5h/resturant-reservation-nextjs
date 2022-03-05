import { ArrowRightOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Restaurants from "../components/resturant";
import cover from "../public/images/cover.svg";
export default function Home() {
  const [token, setToken] = useState();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) setToken(token);
  }, []);
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="main">
        <div className="left">
          <h1>Book Your Table Now</h1>
          <p>
            Get restaurant table reservations Better online than keep a busy
            phone line
          </p>
          {!token ? (
            <Link href="/signup" >
              <a className="btn-login">
                {" "}
                Get Started <ArrowRightOutlined
                  style={{ fontSize: "16px" }}
                />{" "}
              </a>
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