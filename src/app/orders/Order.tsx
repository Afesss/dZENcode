"use client";
import { OrderData } from "@/api/orders-api";
import { deleteProductApi, ProductData } from "@/api/product-api";
import styles from "./order.module.css";
import OrderIcon from "./OrderIcon";
import {
    basePath,
    getFormatDataToDayMonth,
    getFormatDataWhithSlashFullMonth,
    getFormatNumber,
} from "@/utils/halpers";
import { CURRENSY_SYMBOLS } from "@/utils/constants";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import {
    hideDeleteModal,
    showDeleteModal,
} from "@/utils/redux/slices/delete-modal-slice";
import { AnimatePresence, motion } from "motion/react";
import { MouseEvent, useEffect } from "react";
import OrderProducts from "./OrderProducts";
import { RootState } from "@/utils/redux/redux-store";

interface Props {
    order: OrderData;
    products: ProductData[];
    shortLength: boolean;
    showOrderProducts: boolean;
    onShowOrderProducts: () => void;
    onHideOrderProducts: () => void;
}

const constants = {
    deleteMessage: "Вы уверены, что хотите удалить этот приход?",
};

export default function Order(props: Props) {
    const dispatch = useAppDispatch();

    const getFullPriceByCurrensySymbol = (currencySymbol: string): string => {
        const priceArr = props.products.map((product) => {
            const price = product.price.filter(
                (price) => price.symbol === currencySymbol
            );
            return price.length > 0 ? price[0].value : 0;
        });

        const fullPrice = priceArr.reduce((acc, value) => {
            return acc + value;
        }, 0);
        return `${getFormatNumber(fullPrice)} ${currencySymbol}`;
    };

    const handleDelete = (e: MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
        dispatch(
            showDeleteModal({
                message: constants.deleteMessage,
                deleteItemId: props.order.id.toString(),
                deleteItemTitle: props.order.title,
                deleteItemSerialNumber: "",
                deleteIconPath: "",
            })
        );
    };

    const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        props.onShowOrderProducts();
    };
    return (
        <motion.div
            className={styles.order}
            initial={{ height: 0, scaleY: 0 }}
            animate={{ height: "74px", scaleY: 1 }}
            exit={{ height: 0, scaleY: 0 }}
            transition={{ duration: 0.2 }}
            style={
                props.shortLength
                    ? {
                          width: "466px",
                          minWidth: "400px",
                          maxWidth: "466px",
                          transformOrigin: "top",
                      }
                    : {
                          width: "100%",
                          minWidth: "1100px",
                          maxWidth: "1436px",
                          transformOrigin: "top",
                      }
            }
            onClick={(e) => handleOnClick(e)}
        >
            {!props.shortLength && (
                <div className={styles.titleContainer}>
                    <p className={styles.title}>{props.order.title}</p>
                </div>
            )}
            <div className={styles.centerContainer}>
                <OrderIcon />
                <div className={styles.productCountContainer}>
                    <p className={styles.productCount}>
                        {props.products.length}
                    </p>
                    <p className={styles.productText}>Продукта</p>
                </div>
                <div className={styles.dateContainer}>
                    <p className={styles.dateShort}>
                        {getFormatDataToDayMonth(props.order.date)}
                    </p>
                    <p className={styles.dateFull}>
                        {getFormatDataWhithSlashFullMonth(props.order.date)}
                    </p>
                </div>
                {!props.shortLength && (
                    <div>
                        <p className={styles.usdPriceText}>
                            {getFullPriceByCurrensySymbol(CURRENSY_SYMBOLS.usd)}
                        </p>
                        <p className={styles.uahPriceText}>
                            {getFullPriceByCurrensySymbol(CURRENSY_SYMBOLS.uah)}
                        </p>
                    </div>
                )}
            </div>

            {!props.shortLength && (
                <Image
                    src={`${basePath}/icons/trash-icon.png`}
                    alt="trash icon"
                    width={12}
                    height={14}
                    className={styles.trashIcon}
                    onClick={(e) => handleDelete(e)}
                />
            )}
            {props.showOrderProducts && (
                <div className={styles.arrow}>
                    <p>&gt;</p>
                </div>
            )}
            <AnimatePresence>
                {props.showOrderProducts && (
                    <OrderProducts
                        orderTitle={props.order.title}
                        products={props.products}
                        onCloseClick={() => props.onHideOrderProducts()}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}
