"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getAllOrdersApi, OrderData } from "@/api/orders-api";
import Order from "./Order";
import { getAllProductsApi, ProductData } from "@/api/product-api";
import Loader from "@/components/layout/Loader";

export default function OrdersPage() {
    const [data, setData] = useState<Data | null>(null);

    useEffect(() => {
        getDataFromServer();
    }, []);

    const getDataFromServer = async () => {
        const ordersFromBack = await getAllOrdersApi();
        const productsFromBack = await getAllProductsApi();
        if (ordersFromBack && productsFromBack) {
            setData({ orders: ordersFromBack, products: productsFromBack });
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.titleParent}>
                <div className={styles.titleIcon}>
                    <div className={styles.titleIconInnerCircle}>
                        <p>+</p>
                    </div>
                </div>
                <p className={styles.title}>{`Приходы / ${
                    data ? data.orders.length : 0
                }`}</p>
            </div>
            {data && (
                <div className={styles.ordersContainer}>
                    {data.orders.map((order) => {
                        const orderProducts = data.products.filter(
                            (product) => product.order === order.id
                        );
                        return (
                            <Order
                                key={order.id}
                                order={order}
                                products={orderProducts}
                            />
                        );
                    })}
                </div>
            )}
            {!data && <Loader />}
        </div>
    );
}

type Data = {
    orders: OrderData[];
    products: ProductData[];
};
