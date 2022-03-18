import { CloseOutlined, DeleteOutlined, HistoryOutlined, SmileOutlined } from '@ant-design/icons';
import { Empty, message, Spin, Tabs, Timeline } from 'antd';
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { cancalBooking, deleteBooking, getActiveBookings, getPreviousBookings } from '../api';
import { langs } from '../components/layout/navbar';
import { translate } from '../translate';
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
    const cancelItem = (id) => {
        cancalBooking(id, (data, error) => {
            console.log(data);
            if (error) return message.error("something went wrong");
            message.success("cancel Successfully Successfully");
            getPreviousBookings((data, error) => {
                if (error) return message.error("something went wrong");
                let previousBookings = data.data
                setPreviousBookings(previousBookings);

            })
        })
    }
    return (
        <div className="reservation" style={{ direction: `${langs === "en" ? 'ltr' : 'rtl'}`, height: "70vh" }}>
            <Tabs defaultActiveKey="1" >
                <TabPane

                    tab={
                        <span>
                            <SmileOutlined />
                            {translate[langs]["Activebookings"]}
                        </span>
                    }
                    key="1"
                >
                    {!!activeBookings ? (
                        !activeBookings?.length > 0 ? (
                            <Empty title={false} />
                        ) : (

                            <Timeline mode={langs === "en" ? "left" : "right"} >
                                {activeBookings.map((c) => (
                                    <Timeline.Item style={{ width: "800px", padding: "5px 15px " }}>{translate[langs]["tableNo"]}. {c.id} , {" "} {c.numOfPeople} {translate[langs]["person"]} , at  {" "} {moment(c.resTime).format('llll')} {c.status === null ? translate[langs]["waitToAccespt"] : c.status === "accept" ? translate[langs]["accept"] : translate[langs]["regect"]} <CloseOutlined style={{ color: "red", marginLeft: "30px" }} onClick={() => cancelItem(c.id)} /></Timeline.Item>

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
                            {translate[langs]["Previousbookings"]}
                        </span>
                    }

                    key="2"
                >
                    {!!previousBookings ? (
                        !previousBookings?.length > 0 ? (
                            <Empty />
                        ) : (

                            <Timeline mode={langs === "en" ? "left" : "right"}>
                                {previousBookings.map((c) => (
                                    <Timeline.Item style={{ width: "800px", padding: "5px 15px " }}>{translate[langs]["tableNo"]}. {c.id} , {" "} {c.numOfPeople}  {translate[langs]["person"]} , at  {" "} {moment(c.resTime).format('llll')} , {c.status === "accept" ? translate[langs]["accept"] : translate[langs]["regect"]}  <DeleteOutlined style={{ color: "red", marginLeft: "30px" }} onClick={() => deleteItem(c.id)} /></Timeline.Item>

                                ))}

                            </Timeline>
                        )) : (
                        <Spin className="spin" size="large" />
                    )}
                </TabPane>
            </Tabs>
        </div >
    )
}