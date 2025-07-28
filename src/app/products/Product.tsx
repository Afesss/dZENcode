import { ProductData } from "@/api/product-api";
import styles from "./product.module.css";
import Image from "next/image";
import {
    basePath,
    getFormatDataToDayMonth,
    getFormatDataWhithSlashFullMonth,
    getFormatDataWhithSlashNumberMonth,
    getFormatNumber,
} from "@/utils/halpers";
import { CURRENSY_SYMBOLS } from "@/utils/constants";
import { OrderData } from "@/api/orders-api";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { showDeleteModal } from "@/utils/redux/slices/delete-modal-slice";
import { motion } from "motion/react";

interface Props {
    product: ProductData;
    orders: OrderData[];
}

export const deleteProductMessage =
    "Вы уверены, что хотите удалить этот продукт?";

export default function Product(props: Props) {
    const dispatch = useAppDispatch();

    const getPriceBySymbol = (symbol: string): string => {
        const price = props.product.price.find(
            (price) => price.symbol === symbol
        );
        if (price) {
            return `${getFormatNumber(price.value)} ${price.symbol}`;
        }
        return "";
    };

    const getCurrentOrderTitle = (): string => {
        const order = props.orders.find(
            (order) => order.id === props.product.order
        );
        const orderTitle = order ? order?.title : "";

        return orderTitle;
    };

    const handleDelete = () => {
        dispatch(
            showDeleteModal({
                message: deleteProductMessage,
                deleteItemId: props.product.id.toString(),
                deleteItemTitle: props.product.title,
                deleteItemSerialNumber: props.product.serialNumber.toString(),
                deleteIconPath: props.product.photo,
            })
        );
    };

    return (
        <motion.div
            className={styles.product}
            initial={{ height: 0, scaleY: 0 }}
            animate={{ height: "48px", scaleY: 1 }}
            exit={{ height: 0, scaleY: 0 }}
            transition={{ duration: 0.2 }}
            style={{ transformOrigin: "top" }}
        >
            <div
                className={`${styles.circle} ${
                    props.product.isNew === 0
                        ? styles.greenBackgroud
                        : styles.blackBackground
                }`}
            ></div>
            <Image
                src={`${basePath}${props.product.photo}`}
                alt="icon"
                width={30}
                height={20}
                className={styles.icon}
            />
            <div className={styles.titleContainer}>
                <p className={styles.titleText}>{props.product.title}</p>
                <p className={styles.serialNumberText}>
                    {props.product.serialNumber}
                </p>
            </div>
            <p
                className={`${styles.statusText} ${
                    props.product.isNew == 0
                        ? styles.textBlack
                        : styles.textGreen
                }`}
            >
                {props.product.isNew === 0 ? "В ремонте" : "свободен"}
            </p>
            <div className={styles.guaranteeContainer}>
                <p>
                    <span>c&nbsp;&nbsp;&nbsp;</span>
                    <span>
                        {getFormatDataWhithSlashNumberMonth(
                            props.product.guarantee.start
                        )}
                    </span>
                </p>
                <p>
                    <span>по&nbsp;</span>
                    <span>
                        {getFormatDataWhithSlashNumberMonth(
                            props.product.guarantee.end
                        )}
                    </span>
                </p>
            </div>
            <p className={styles.isNewText}>
                {props.product.isNew === 0 ? "Б / У" : "новый"}
            </p>
            <div className={styles.priceContainer}>
                <p className={styles.usdPriceText}>
                    {getPriceBySymbol(CURRENSY_SYMBOLS.usd)}
                </p>
                <p className={styles.uahPriceText}>
                    {getPriceBySymbol(CURRENSY_SYMBOLS.uah)}
                </p>
            </div>
            <p className={styles.groupNameText}>{props.product.type}</p>
            <p className={styles.nameText}>—</p>
            <p className={styles.orderTitleText}>{getCurrentOrderTitle()}</p>
            <div className={styles.dateContainer}>
                <p className={styles.dateShort}>
                    {getFormatDataToDayMonth(props.product.date)}
                </p>
                <p className={styles.dateFull}>
                    {getFormatDataWhithSlashFullMonth(props.product.date)}
                </p>
            </div>
            <Image
                src={`${basePath}/icons/trash-icon.png`}
                alt="trash icon"
                width={12}
                height={14}
                className={styles.trashIcon}
                onClick={() => handleDelete()}
            />
        </motion.div>
    );
}
