import { Empty, message, Spin, Tag } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ApiRestaurant } from "../api";
const Restaurants = () => {
    const [restaurant, setRestaurant] = useState();
    useEffect(() => {
        ApiRestaurant((data, error) => {
            console.log(data);
            if (error) return message.error(error);
            setRestaurant(data);
            console.log(data);
        });
    }, []);
    return (
        <div className="restaurants">
            <h1>Restaurants</h1>
            <div className="cards-list">
                {!!restaurant ? (
                    !restaurant?.length > 0 ? (
                        <Empty />
                    ) : (
                        restaurant.map((rest) => (
                            <div className="card" key={rest.id}>
                                <div className="card_image">
                                    <Link href={`/singleRestaurant/${rest.id}`}>
                                        <img src={rest.bgImage} />
                                    </Link>
                                </div>
                                <div className="card_title title-white">
                                    <Tag color="rgba(0, 0, 0,.5)">
                                        {rest.name}

                                    </Tag>
                                </div>
                            </div>
                        ))
                    )
                ) : (
                    <Spin className="spin" size="large" />
                )}
            </div>
        </div>
    );
};
export default Restaurants;