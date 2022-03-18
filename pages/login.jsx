import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import Cookies from "js-cookie";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ApiLogin } from "../api";
import { langs } from '../components/layout/navbar';
import cover from "../public/images/login.svg";
import { translate } from '../translate';
const Login = () => {
    const Router = useRouter();

    const [loading, setLoading] = useState(false);
    const onFinish = (info) => {
        console.log(`info: ${info}`);
        setLoading(true);
        ApiLogin(info, (data, error) => {
            console.log(`data: ${data}`);
            console.log(`info: ${info}`);
            setLoading(false);
            if (error) return message.error("Invalid credentials");
            Cookies.set("token", data.token);
            console.log(data.user)
            Cookies.set("user", JSON.stringify(data.user));
            Router.push("/");
        });
    };
    return (
        <>
            <Head>
                <title>{translate[langs]["login"]}</title>
            </Head>
            <div className="login" style={{ flexDirection: `${langs === "en" ? "row" : "row-reverse"}`, textAlign: `${langs === "en" ? "left" : "right"}` }}>
                <div className="left" >
                    <h1>{translate[langs]["login"]}</h1>

                    <Form
                        initialValues={{
                            remember: true,
                        }}
                        name="login"
                        onFinish={onFinish}
                        className="form"
                        scrollToFirstError
                    >
                        <Form.Item
                            name="phone"
                            rules={[

                                {
                                    required: true,
                                    message: langs === 'en' ? "Please input your phone!" : "الرجاء إدخال هاتفك!",
                                },
                            ]}
                        >
                            <Input placeholder="0780000000" className="input" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: langs === 'en' ? "Please input your password!" : "الرجاء إدخال كلمة المرور الخاصة بك!",
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="********" className="password" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                loading={loading}
                                disabled={loading}
                                type="primary"
                                htmlType="submit"
                            >
                                {langs === 'en' ? < ArrowRightOutlined style={{ fontWeight: 900 }} /> : <ArrowLeftOutlined style={{ fontWeight: 900 }} />}

                            </Button>
                        </Form.Item>
                    </Form>
                    <p>
                        {translate[langs]["haveAccount"]} ? <Link style={{ color: "blue" }} href="/signup">{translate[langs]["signup"]}</Link>
                    </p>
                </div>
                <div className="right">
                    <Image className="cover" src={cover} />
                </div>
            </div>
        </>
    );
};
export default Login;