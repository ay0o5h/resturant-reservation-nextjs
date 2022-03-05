import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import Cookies from "js-cookie";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ApiRegister } from "../api";
import cover from "../public/images/login.svg";
const Signup = () => {
    const Router = useRouter();
    const onFinish = (info) => {
        ApiRegister(info, (data, error) => {
            if (error) return message.error(error);
            Cookies.set("token", data.token);
            Cookies.set("user", JSON.stringify(data.user));
            Router.push("/");
        });
    };
    return (
        <>
            <Head>
                <title>Sign up</title>
            </Head>
            <div className="login">
                <div className="left">
                    <h1>Sign up</h1>
                    <Form
                        initialValues={{
                            remember: true,
                        }}
                        name="register"
                        onFinish={onFinish}
                        className="form"
                        scrollToFirstError
                    >
                        <Form.Item
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your name!",
                                },
                            ]}
                        >
                            <Input placeholder="Aya" className="input" />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your name!",
                                },
                            ]}
                        >
                            <Input placeholder="munadhil" className="input" />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your E-mail!",
                                },
                            ]}
                        >
                            <Input placeholder="07805847657" className="input" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="********" className="password" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                <ArrowRightOutlined style={{ fontWeight: 900 }} />
                            </Button>
                        </Form.Item>
                    </Form>
                    <p>
                        already have an account ? <Link href="/login">Login</Link>
                    </p>
                </div>
                <div className="right">
                    <Image className="cover" src={cover} />
                </div>
            </div>
        </>
    );
};
export default Signup;