import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Appointments, DayView, Scheduler
} from '@devexpress/dx-react-scheduler-material-ui';
// const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
import Paper from '@mui/material/Paper';
import {
    Button, Card, DatePicker,
    Empty,
    Form, InputNumber, message, Popover, Spin
} from "antd";
// import Scheduler, { Resource } from 'devextreme-react/scheduler';
import "devextreme/dist/css/dx.light.css";
import Cookies from "js-cookie";
import moment from "moment";
// import dynamic from 'next/dynamic';
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import 'smart-webcomponents-react/source/styles/smart.default.css';
import { ApiRestaurantOne } from "../../api";


const currentDate = '2018-11-01';
const schedulerData = [
    { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
    { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];
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
    const handleRect = () => {
        console.log(okay)
    };
    const refreshPage = () => {
        window.location.reload();
    };
    function onChangeStart(value, dateString) {
        const startTime = dateString;
        setStartTime(startTime);
        console.log(startTime);
    }
    function onChangeEnd(value, dateString) {
        const endTime = dateString;
        setEndTime(endTime);
        console.log(endTime);
    }
    function onChangeNum(value) {
        const numOfPeople = value;
        setNumOfPeople(numOfPeople);
        console.log(numOfPeople);
    }
    const onFinish = () => {
        const packet = {
            discription: "ok",
            reservationsDate: startTime,
            reservationsExpires: endTime,
            noumberOfPeople: numOfPeople,
            restaurantId: parseInt(id),
            tableId,
        };
        console.log(packet);
        ApiReservation(packet, (data, error) => {
            console.log(data);
            if (error) return message.error(error);
            message.success("Successfully booked");
            refreshPage();
        });
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
                // <img src={restaurant.bgImage} width="100%" height="600px" />

                <div className="bgImage" style={{ backgroundImage: `url(${restaurant.bgImage})` }}>
                    <div className="card" data-tilt data-tilt-scale="0.95" data-tilt-startY="40">
                        <div className="welcome">
                            {/* Welcome to */}
                            {restaurant.isOpen ? 'open now ' : 'Close now'}
                        </div>
                        <div className="year">
                            <span> Welcome to</span>
                            <span>{restaurant.name}</span>
                            <span>{moment(restaurant.openDate).utc().format(" HH:mm ")}- {moment(restaurant.closeDate).utc().format(" HH:mm ")}</span>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="singleRestaurant">
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
                                    <Popover
                                        content={"this table has " + restaurant.numOfTable + " seats"}
                                        title={"table number " + restaurant.numOfTable}
                                    >
                                        <circle
                                            onClick={() => handleRect(t.id)}
                                            className="circle"
                                            key={t.id}
                                            cx={t.x}
                                            cy={t.y}
                                            r="15"
                                            fill={
                                                // (userTables !== undefined &&
                                                //     userTables[0] === table.id) ||
                                                //     (userTables !== undefined &&
                                                //         userTables[1] === table.id) ||
                                                //     (userTables !== undefined &&
                                                //         userTables[2] === table.id) ||
                                                //     (userTables !== undefined &&
                                                //         userTables[3] === table.id) ||
                                                //     (userTables !== undefined &&
                                                //         userTables[4] === table.id) ||
                                                //     (userTables !== undefined &&
                                                //         userTables[5] === table.id) ||
                                                //     (userTables !== undefined &&
                                                //         userTables[6] === table.id) ||
                                                //     (userTables !== undefined &&
                                                //         userTables[7] === table.id) ||
                                                //     (userTables !== undefined &&
                                                //         userTables[8] === table.id) ||
                                                //     (userTables !== undefined && userTables[9] === table.id)
                                                //     ? "red"
                                                //     :
                                                "#882121"
                                            }
                                        ></circle>
                                    </Popover>
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
                            title="Make Reseravation"
                            bordered={true}
                            style={{ width: 500 }}
                        >
                            <Form
                                className="form"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="reservationsDate"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select a start reservation time",
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        disabledDate={disabledDate}
                                        showTime={{ format: "HH:mm" }}
                                        format="YYYY-MM-DD HH:mm"
                                        onChange={onChangeStart}
                                        className="picker"
                                        placeholder="pleace choice  date of reservation"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="reservationsExpires"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select a end reservation time",
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        disabledDate={disabledDate}
                                        showTime={{ format: "HH:mm" }}
                                        format="YYYY-MM-DD HH:mm"
                                        onChange={onChangeEnd}
                                        className="picker"
                                        placeholder="pleace enter expier  date of reservation"
                                    />
                                </Form.Item>
                                <Form.Item name="noumberOfPeople">
                                    <InputNumber
                                        placeholder="pleace enter no of people"
                                        className="picker-num"
                                        min={1}
                                        max={100}
                                        onChange={onChangeNum}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Book now
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                    ,
                </div>

            </div>
            {/* <Scheduler className="scheduler" id="scheduler" currentTimeIndicator={currentTimeIndicator} shadeUntilCurrentTime={shadeUntilCurrentTime}
                dataSource={dataSource} view={view} firstDayOfWeek={firstDayOfWeek}></Scheduler> */}
            <div style={{ height: "500px", width: "500px" }}>
                <Paper>
                    <Scheduler
                        data={schedulerData}
                        onCommitChanges={(value) => console.log(value)}
                    >
                        <ViewState
                            currentDate={currentDate}
                            onOptionChanged={({ value }) => console.log(value)}

                        />
                        <DayView
                            startDayHour={9}
                            endDayHour={14}
                            onOptionChanged={({ value }) => console.log(value)}

                        />

                        <Appointments onOptionChanged={({ value }) => console.log(value)} />
                    </Scheduler>
                </Paper>
            </div>
        </div>
    );
};
export default Resturant;