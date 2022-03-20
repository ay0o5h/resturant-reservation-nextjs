import { Empty, message, Spin, Tag } from "antd";
import { useTranslations } from 'next-intl';
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiRestaurant } from "../api";
const Restaurants = () => {
    const { locale, locales, defaultLocale, asPath } = useRouter();
    const t = useTranslations('home');
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
            <h1>{t("restaurants")}</h1>
            <div className="cards-list">
                {!!restaurant ? (
                    !restaurant?.length > 0 ? (
                        <Empty />
                    ) : (
                        restaurant.map((rest) => (
                            <div className="card" key={rest.id}>
                                <div className="card_image">
                                    <Link href={`/Resturant/${rest.id}`}>
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