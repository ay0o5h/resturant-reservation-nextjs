import {
    Button, Card, DatePicker,
    Empty,
    Form, InputNumber, message, Spin
} from "antd";
import "devextreme/dist/css/dx.light.css";
import Cookies from "js-cookie";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiRestaurantOne, makeReservation } from "../../api";
import { langs } from '../../components/layout/navbar';
import { translate } from '../../translate';

const Resturant = () => {
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
    const [dataSource, setdataSource] = useState([]);



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
                    return message.error(translate[langs]["somethingWrong"])
                };
                message.success(translate[langs]["successfullybooked"]);
                refreshPage();
            });
        } else {
            return message.error(translate[langs]["needLogin"])
        }
    };
    function disabledDate(current) {
        return current && current < moment().startOf("day");
    }

    return (
        <div >
            <Head>
                <title>{!!restaurant ? restaurant.name : null}</title>
            </Head>

            {!!restaurant ? (

                <div className="bgImage" style={{ backgroundImage: `url(${restaurant.bgImage})` }}>
                    <div className="card" data-tilt data-tilt-scale="0.95" data-tilt-startY="40">
                        <div className="welcome" style={{ textAlign: `${langs === "en" ? 'left' : 'right'}` }}>
                            {restaurant.isOpen ? translate[langs]["open"] : translate[langs]["close"]}
                        </div>
                        <div className="year">
                            <span style={{ textAlign: `${langs === "en" ? 'left' : 'right'}` }}> {translate[langs]["welcome"]}</span>
                            <span>{restaurant.name}</span>
                            <span>{moment(restaurant.openDate).utc().format(" HH:mm ")}- {moment(restaurant.closeDate).utc().format(" HH:mm ")}</span>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="singleRestaurant" style={{ flexDirection: `${langs === "en" ? "row" : "row-reverse"}` }}>
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
                                        onClick={t.isBooked ? () => message.error(translate[langs]["alreadyBooked"]) : () => handleRect(t.id)}
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
                            title={translate[langs]["makeReseravation"]}
                            bordered={true}
                            style={{ width: 500, textAlign: `${langs === "en" ? 'left' : 'right'}` }}
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
                                            message: translate[langs]["makeReseravation"]
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        disabledDate={disabledDate}
                                        showTime={{ format: "HH:mm" }}
                                        format="YYYY-MM-DD HH:mm"
                                        onChange={onChangeStart}
                                        className="picker"
                                        placeholder={translate[langs]["choiceTime"]}
                                    />
                                </Form.Item>

                                <Form.Item name="numOfPeople">
                                    <InputNumber
                                        placeholder={translate[langs]["noPeople"]}
                                        className="picker-num"
                                        min={1}
                                        max={100}
                                        onChange={onChangeNum}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        {translate[langs]["BookNow"]}
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