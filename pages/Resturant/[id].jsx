import {
    Button, Card, Empty,
    Form, InputNumber, message, Spin, TimePicker
} from "antd";
import "devextreme/dist/css/dx.light.css";
import Cookies from "js-cookie";
import moment from "moment";
import { useTranslations } from 'next-intl';
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiRestaurantOne, makeReservation, updateResturantState } from "../../api";
const Resturant = () => {
    const { locale, locales, defaultLocale, asPath } = useRouter();
    const t = useTranslations('home');
    const Router = useRouter();
    const [tables, setTables] = useState("")
    const [token, setToken] = useState("");
    const [restaurant, setRestaurant] = useState();
    const { id } = Router.query;
    const [tableId, setTableId] = useState();
    const [bookTime, setBookTime] = useState();
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [numOfPeople, setNumOfPeople] = useState(0);
    const [isopen, setIsOpen] = useState("");


    useEffect(() => {

        const token = Cookies.get("token");
        setToken(token);
        console.log(token);
        ApiRestaurantOne(id, (data, error) => {
            console.log(data);
            if (error) return message.error(error);
            setRestaurant(data);
            let tables = data.table;
            setTables(tables)

            console.log(tables);

        });
        updateResturantState(id, (data, error) => {
            console.log(id)
            if (error) return message.error(t("somethingWrong"));
            let isopen = data.rest.isOpen
            setIsOpen(isopen);
            console.log(data);
        })
    }, [Router]);
    const handleRect = (id) => {
        setTableId(() => id);
    };
    const refreshPage = () => {
        window.location.reload();
    };
    function onChangeStart(value, dateString) {
        // const startTime = dateString;
        setStartTime(() => dateString);
        console.log(startTime);
    }
    function onChangeNum(value) {
        const numOfPeople = value;
        setNumOfPeople(numOfPeople);
        console.log(numOfPeople);
    }
    const onFinish = () => {
        if (token) {
            const packet = {
                resTime: startTime,
                numOfPeople: numOfPeople,
                table: tableId,
            };
            console.log(packet);
            makeReservation(parseInt(id), packet, (data, error) => {
                console.log(data);
                if (error) {
                    console.log(error);
                    return message.error(t("somethingWrong"))
                };
                message.success(t("successfullybooked"));
                refreshPage();
            });
        } else {
            return message.error(t("needLogin"))
        }
    };
    const getDisabledHours = () => {
        var hours = [];
        for (var i = 0; i < moment().hour(); i++) {
            hours.push(i);
        }
        for (var i = moment(restaurant.closeDate).format("HH"); i < 24; i++) {
            hours.push(i);

        }
        for (var i = moment(restaurant.openDate).format("HH") - 1; i >= 0; i--) {
            hours.push(i);
        }
        for (var i = moment(restaurant.closeDate).format("HH"); i < 24; i++) {
            hours.push(i);

        }
        return hours;
    }

    const getDisabledMinutes = (selectedHour) => {
        var minutes = [];
        if (selectedHour === moment().hour()) {
            for (var i = 0; i < moment().minute(); i++) {
                minutes.push(i);
            }
        }

        return minutes;
    }
    return (
        <div >
            <Head>
                <title>{!!restaurant ? restaurant.name : null}</title>
            </Head>

            {!!restaurant ? (

                <div className="bgImage" style={{ backgroundImage: `url(${restaurant.bgImage})` }}>
                    <div className="card" data-tilt data-tilt-scale="0.95" data-tilt-startY="40">
                        <div className="welcome" style={{ textAlign: `${locale === "en" ? 'left' : 'right'}` }}>
                            {isopen ? t("open") : t("close")}
                        </div>
                        <div className="year">
                            <span style={{ textAlign: `${locale === "en" ? 'left' : 'right'}` }}> {t("welcome")}</span>
                            <span>{restaurant.name}</span>
                            <span>{moment(restaurant.openDate).format(" HH:mm ")}- {moment(restaurant.closeDate).format(" HH:mm ")}</span>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="singleRestaurant" style={{ flexDirection: `${locale === "en" ? "row" : "row-reverse"}` }}>
                <div className="left">
                    <svg version="1.1" baseProfile="full" width="500" height="500">
                        {!!restaurant ? (
                            <image
                                className="imgMap"
                                href={restaurant.floorMap}
                                x="0"
                                y="0"
                                height="500px"
                                width="500px"
                            />
                        ) : null}

                        {!!tables ? (
                            !tables?.length > 0 ? (
                                <Empty />
                            ) : (
                                tables?.map((t) => (
                                    // <Popover
                                    //     content={"this table has " + restaurant.numOfTable + " seats"}
                                    //     title={"table number " + restaurant.numOfTable}
                                    // >
                                    <circle
                                        onClick={t.isBooked ? () => message.error(t("alreadyBooked")) : () => handleRect(t.id)}
                                        className="circle"
                                        key={t.id}
                                        cx={t.x}
                                        cy={t.y}
                                        r="15"
                                        fill={t.isBooked ? "red" : "#882121"}
                                    ></circle>
                                    // </Popover>
                                ))
                            )
                        ) : (
                            <Spin className="spin" size="large" />
                        )}
                    </svg>
                </div>
                <div className="right">
                    <div className="site-card-border-less-wrapper">
                        <Card
                            className="card-res"
                            title={t("makeReseravation")}
                            bordered={true}
                            style={{ width: 500, textAlign: `${locale === "en" ? 'left' : 'right'}` }}
                        >
                            <Form
                                className="form"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="resTime"
                                    rules={[
                                        {
                                            required: true,
                                            message: t("makeReseravation")
                                        },
                                    ]}
                                >
                                    <TimePicker
                                        onChange={onChangeStart}
                                        className="picker"
                                        disabledHours={getDisabledHours}
                                        disabledMinutes={getDisabledMinutes}
                                        placeholder={t("choiceTime")} showNow={false} format='HH:mm' />

                                </Form.Item>

                                <Form.Item name="numOfPeople">
                                    <InputNumber
                                        placeholder={t("noPeople")}
                                        className="picker-num"
                                        min={1}
                                        max={100}
                                        onChange={onChangeNum}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        {t("BookNow")}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Resturant;
export async function getStaticProps({ locale }) {
    let data = null;
    let s;
    if (typeof window !== "undefined") {
        const currentURL = window.location.pathname;
        s = currentURL.substring(currentURL.length - 1);
        console.log(s)

    }
    try {
        data = await getData(s);
    } catch (err) { console.log(err) };




    return {
        props: {
            messages: (await import(`../../lang/${locale}.json`)).default,
            id: String(s),
            data,
        }
    };
}

// }
export async function getStaticPaths() {

    let s;
    if (typeof window !== "undefined") {
        const currentURL = window.location.pathname;
        s = currentURL.substring(currentURL.length - 1);
        console.log(s)

    }
    return {
        paths: [
            { params: { id: String(s) } }
        ],
        fallback: true // false or 'blocking'
    };
}
// export async function getStaticPaths() {

//     const paths = getAllPostIds().toString();

//     return {

//         paths,

//         fallback: false,

//     };

// }


// const getAllPostIds = async () => {

//     const postsDirectory = await promises.readFile(join(process.cwd(), 'Resturant', '[id].jsx'))

//     const fileNames = fs.readdirSync(postsDirectory)


//     return fileNames.map(fileName => {

//         return {

//             params: {

//                 id: fileName.replace(/\.md$/, '')

//             }

//         }

//     })

// }