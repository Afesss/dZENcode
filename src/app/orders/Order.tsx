"use client";
import { OrderData } from "@/api/orders-api";
import { ProductData } from "@/api/product-api";
import styles from "./order.module.css";
import OrderIcon from "./OrderIcon";
import {
    getFormatDataToDayMonth,
    getFormatDataWhithSlash,
    getFormatNumber,
} from "@/utils/halpers";
import { CURRENSY_SYMBOLS } from "@/utils/constants";
import Image from "next/image";

interface Props {
    order: OrderData;
    products: ProductData[];
}

export default function Order(props: Props) {
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

    return (
        <div className={styles.order}>
            <p className={styles.title}>Длинное название</p>
            <OrderIcon />
            <div>
                <p className={styles.productCount}>{props.products.length}</p>
                <p className={styles.productText}>Продукта</p>
            </div>
            <div className={styles.dateContainer}>
                <p className={styles.dateShort}>
                    {getFormatDataToDayMonth(props.order.date)}
                </p>
                <p className={styles.dateFull}>
                    {getFormatDataWhithSlash(props.order.date)}
                </p>
            </div>
            <div>
                <p className={styles.usdPriceText}>
                    {getFullPriceByCurrensySymbol(CURRENSY_SYMBOLS.usd)}
                </p>
                <p className={styles.uahPriceText}>
                    {getFullPriceByCurrensySymbol(CURRENSY_SYMBOLS.uah)}
                </p>
            </div>
            <Image
                src="/icons/trash-icon.png"
                alt="trash icon"
                width={12}
                height={14}
            />
        </div>
    );
}
