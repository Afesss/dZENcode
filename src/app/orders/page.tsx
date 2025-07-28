"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { deleteOrderApi, getAllOrdersApi, OrderData } from "@/api/orders-api";
import Order from "./Order";
import {
    deleteProductApi,
    getAllProductsApi,
    ProductData,
} from "@/api/product-api";
import Loader from "@/components/layout/Loader";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { RootState } from "@/utils/redux/redux-store";
import { hideDeleteModal } from "@/utils/redux/slices/delete-modal-slice";
import { AnimatePresence } from "motion/react";

export default function OrdersPage() {
    const [data, setData] = useState<OrdersProductsData | null>(null);
    const [filteredOrders, setFilteredOrders] = useState<OrderData[]>([]);
    const [showOrderProductsId, setShowOrderProductsId] = useState<
        number | null
    >(null);
    const [orderShortLength, setOrderShortLength] = useState<boolean>(false);
    const deleteModal = useAppSelector((state: RootState) => state.deleteModal);
    const search = useAppSelector((state: RootState) => state.search);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data) {
            filterOrders(data.orders);
        }
    }, [search]);

    useEffect(() => {
        if (deleteModal.delete && data) {
            const order = data.orders.find(
                (order) => order.title === deleteModal.deleteItemTitle
            );
            const product = data.products.find(
                (product) => product.title == deleteModal.deleteItemTitle
            );
            if (order) {
                deleteOrder(Number.parseInt(deleteModal.deleteItemId));
            }
            if (product) {
                deleteProduct(Number.parseInt(deleteModal.deleteItemId));
            }
            dispatch(hideDeleteModal());
        }
    }, [deleteModal]);

    useEffect(() => {
        getDataFromServer();
    }, []);

    const deleteProduct = async (id: number) => {
        await deleteProductApi(id);
        const productsFromBack = await getAllProductsApi();
        if (productsFromBack) {
            setData({
                orders: data ? data.orders : [],
                products: productsFromBack,
            });
        }
    };

    const filterOrders = (orders: OrderData[]) => {
        const fOrders = orders.filter((order) =>
            order.title.toLowerCase().includes(search.value.toLowerCase())
        );
        setFilteredOrders(fOrders);
    };

    const deleteOrder = async (id: number) => {
        await deleteOrderApi(id);
        const ordersFromBack = await getAllOrdersApi();
        if (ordersFromBack) {
            setData({
                orders: ordersFromBack,
                products: data ? data.products : [],
            });
            filterOrders(ordersFromBack);
        }
    };

    const getDataFromServer = async () => {
        const ordersFromBack = await getAllOrdersApi();
        const productsFromBack = await getAllProductsApi();
        if (ordersFromBack && productsFromBack) {
            setData({ orders: ordersFromBack, products: productsFromBack });
            filterOrders(ordersFromBack);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <div className={styles.titleContainer}>
                    <div className={styles.titleIcon}>
                        <div className={styles.titleIconInnerCircle}>
                            <p>+</p>
                        </div>
                    </div>
                    <p
                        className={styles.title}
                    >{`Приходы / ${filteredOrders.length}`}</p>
                </div>

                {data && (
                    <div className={styles.ordersContainer}>
                        <AnimatePresence>
                            {filteredOrders.map((order) => {
                                const orderProducts = data.products.filter(
                                    (product) => product.order === order.id
                                );
                                return (
                                    <Order
                                        key={order.id}
                                        order={order}
                                        products={orderProducts}
                                        shortLength={orderShortLength}
                                        showOrderProducts={
                                            showOrderProductsId === order.id
                                        }
                                        onShowOrderProducts={() => {
                                            setOrderShortLength(true);
                                            setShowOrderProductsId(order.id);
                                        }}
                                        onHideOrderProducts={() => {
                                            setOrderShortLength(false);
                                            setShowOrderProductsId(null);
                                        }}
                                    />
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
                {!data && <Loader />}
            </div>
        </div>
    );
}

export type OrdersProductsData = {
    orders: OrderData[];
    products: ProductData[];
};
