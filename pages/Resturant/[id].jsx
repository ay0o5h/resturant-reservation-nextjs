import {
    Button, Card, DatePicker,
    Empty,
    Form, InputNumber, message, Popover, Spin
} from "antd";
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import "devextreme/dist/css/dx.light.css";
import Cookies from "js-cookie";
import moment from "moment";
// import dynamic from 'next/dynamic';
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import 'smart-webcomponents-react/source/styles/smart.default.css';
import { ApiRestaurantOne } from "../../api";
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


const currentDate = new Date();
const views = ['day'];
export const dataCal = [
    {
        text: 'متاح',
        roomId: [1],
        startDate: new Date('2022-03-10T17:30:00.000Z'),
        endDate: new Date('2022-03-10T19:00:00.000Z'),
        recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TH;COUNT=10',
    }, {
        text: 'متاح',
        roomId: [1],
        startDate: new Date('2020-11-01T17:30:00.000Z'),
        endDate: new Date('2020-11-01T19:00:00.000Z'),
        recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU,WE;COUNT=10',
    }, {
        text: 'متاح',
        roomId: [1],
        startDate: new Date('2020-11-01T20:00:00.000Z'),
        endDate: new Date('2020-11-01T21:00:00.000Z'),
        recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU;WKST=TU;INTERVAL=2;COUNT=2',
    }, {
        text: 'متاح',
        roomId: [1],
        startDate: new Date('2020-11-01T17:00:00.000Z'),
        endDate: new Date('2020-11-01T17:15:00.000Z'),
        recurrenceRule: 'FREQ=DAILY;BYDAY=TU;UNTIL=20201203',
    }, {
        text: 'متاح',
        roomId: [1],
        startDate: new Date('2020-10-24T18:00:00.000Z'),
        endDate: new Date('2020-10-24T19:00:00.000Z'),
        recurrenceRule: 'FREQ=YEARLY;BYWEEKNO=50;WKST=SU',
        recurrenceException: '20201212T190000Z',
    }, {
        text: 'متاح',
        roomId: [1],
        startDate: new Date('2020-10-24T20:00:00.000Z'),
        endDate: new Date('2020-10-24T21:35:00.000Z'),
        recurrenceRule: 'FREQ=YEARLY;BYWEEKNO=51;BYDAY=WE,TH',
    }, {
        text: 'متاح',
        roomId: [1],
        startDate: new Date('2020-11-24T22:30:00.000Z'),
        endDate: new Date('2020-11-24T23:45:00.000Z'),
        recurrenceRule: 'FREQ=MONTHLY;BYMONTHDAY=28;COUNT=1',
    }, {
        text: 'متاح',
        roomId: [1],
        startDate: new Date('2020-11-01T17:30:00.000Z'),
        endDate: new Date('2020-11-01T21:00:00.000Z'),
        recurrenceRule: 'FREQ=YEARLY;BYYEARDAY=333',
    },
];

export const resourcesData = [
    {
        id: 1,
        color: '#03bb92',
    },
];

// const Scheduler = dynamic(() => import('smart-webcomponents-react/scheduler'), {
//     ssr: false, //no server-side rendering 


// });

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
    const onContentReady = (e) => {
        console.log("onContentReady", e);

        // e.component.scrollTo(new Date());
    }

    const onAppointmentClick = (e) => {
        e.cancel = true;
    }

    const onAppointmentDblClick = (e) => {

        e.cancel = true;
    }
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
            dataSource = [
                {
                    label: 'Google AdWords Strategy',
                    dateStart: new Date(currentYear, currentMonth, todayDate, 9, 0),
                    dateEnd: new Date(currentYear, currentMonth, todayDate, 10, 30),
                    backgroundColor: '#E67C73'
                }, {
                    label: 'New Brochures',
                    dateStart: new Date(currentYear, currentMonth, todayDate - 1, 11, 30),
                    dateEnd: new Date(currentYear, currentMonth, todayDate - 1, 14, 15),
                    backgroundColor: '#8E24AA'
                },
                {
                    label: 'open',
                    dateStart: new Date(restaurant.openDate),
                    dateEnd: new Date(restaurant.openDate),
                    backgroundColor: 'green',
                    repeat: {
                        repeatFreq: 'daily'
                    }
                },
                {
                    label: 'close',
                    dateStart: new Date(restaurant.closeDate),
                    dateEnd: new Date(restaurant.closeDate),
                    backgroundColor: 'red',
                    repeat: {
                        repeatFreq: 'daily'
                    }
                },
            ],
                setdata_source(dataSource)
            console.log(data);
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
    const today = new Date(),
        todayDate = today.getDate(),
        currentYear = today.getFullYear(),
        currentMonth = today.getMonth(),

        currentTimeIndicator = true,
        shadeUntilCurrentTime = true,
        view = 'day',
        firstDayOfWeek = 1;
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
            <div className="" height="500px" width="500px">
                <Scheduler
                    // rtlEnabled={true}
                    timeZone={timezone}
                    dataSource={dataCal}
                    views={views}
                    defaultCurrentView="day"
                    defaultCurrentDate={currentDate}
                    startDayHour={8}
                    // height={500}

                    editing={false}
                    showAllDayPanel={false}
                    onContentReady={onContentReady}
                    onAppointmentClick={onAppointmentClick}
                    onAppointmentDblClick={onAppointmentDblClick}
                    onOptionChanged={({ value }) => {

                        // if (value[0] !== undefined) {
                        //     setSelecttTime(() => moment(value[0].startDate).format('YYYY-MM-DD'))
                        //     console.log("the selected date is now", selectTime)
                        //     console.log("day format", moment(value[0].startDate).format('dd'))
                        //     let dayy = moment(value[0].startDate).format('dd');
                        //     if (arrDayLetters.includes(dayy.toUpperCase())) {
                        //         setChoosenDay(() => dayy.toUpperCase())

                        //         getTime(moment(value[0].startDate).format('YYYY-MM-DD'))
                        //     } else {
                        //         message.error("الطبيب غير متاح في هذا اليوم ");
                        //     }
                        // }
                        console.log(value)

                    }}
                >
                    <Resource
                        dataSource={resourcesData}
                        fieldExpr="roomId"
                        label="Room"
                    />
                </Scheduler>
            </div>
        </div>
    );
};
export default Resturant;