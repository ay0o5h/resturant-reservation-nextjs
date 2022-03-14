import { DeleteOutlined, HistoryOutlined, SmileOutlined } from '@ant-design/icons';
import { Empty, message, Spin, Tabs, Timeline } from 'antd';
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { deleteBooking, getActiveBookings, getPreviousBookings } from '../api';

const { TabPane } = Tabs;
export default function Reservation() {
    const [activeBookings, setActiveBookings] = useState([]);
    const [previousBookings, setPreviousBookings] = useState([]);
    const Router = useRouter();

    useEffect(() => {
        getActiveBookings((data, error) => {
            if (error) return message.error("something went wrong");
            let activeBookings = data.data
            setActiveBookings(activeBookings);
            console.log(data);

        })
        getPreviousBookings((data, error) => {
            if (error) return message.error("something went wrong");
            let previousBookings = data.data
            setPreviousBookings(previousBookings);

        })
    }, [Router])
    const deleteItem = (id) => {
        deleteBooking(id, (data, error) => {
            console.log(data);
            if (error) return message.error("something went wrong");
            message.success("Delete Successfully");
            getPreviousBookings((data, error) => {
                if (error) return message.error("something went wrong");
                let previousBookings = data.data
                setPreviousBookings(previousBookings);

            })
        })
    }
    return (
        <div className="reservation">
            <Tabs defaultActiveKey="1">
                <TabPane
                    tab={
                        <span>
                            <SmileOutlined />
                            Active bookings
                        </span>
                    }
                    key="1"
                >
                    {!!activeBookings ? (
                        !activeBookings?.length > 0 ? (
                            <Empty />
                        ) : (

                            <Timeline>
                                {activeBookings.map((c) => (
                                    <Timeline.Item>table No. {c.id} , {" "} {c.numOfPeople} person , at  {" "} {moment(c.resTime).format('llll')} {c.status === null ? "wait to accespt" : c.status}</Timeline.Item>

                                ))}

                            </Timeline>
                        )) : (
                        <Spin className="spin" size="large" />
                    )}
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <HistoryOutlined />
                            Previous bookings
                        </span>
                    }

                    key="2"
                >
                    {!!previousBookings ? (
                        !previousBookings?.length > 0 ? (
                            <Empty />
                        ) : (

                            <Timeline>
                                {previousBookings.map((c) => (
                                    <Timeline.Item>table No. {c.id} , {" "} {c.numOfPeople} person , at  {" "} {moment(c.resTime).format('llll')} , {c.status}  <DeleteOutlined style={{ color: "red", marginLeft: "30px" }} onClick={() => deleteItem(c.id)} /></Timeline.Item>

                                ))}

                            </Timeline>
                        )) : (
                        <Spin className="spin" size="large" />
                    )}
                </TabPane>
            </Tabs>
        </div>
    )
}