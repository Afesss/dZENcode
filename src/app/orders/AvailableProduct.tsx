import { ProductData } from "@/api/product-api";
import styles from "./available-produc.module.css";
import Image from "next/image";

interface Props {
    product: ProductData;
    minTitleWidth: number;
}

export default function AvailableProduct(props: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <div className={styles.circle}></div>
                <Image
                    src={`${props.product.photo}`}
                    alt="icon"
                    width={44}
                    height={30}
                    className={styles.icon}
                />
                <div
                    className={styles.titleContainer}
                    style={{ minWidth: `${props.minTitleWidth}ch` }}
                >
                    <p className={styles.producTitleText}>
                        {props.product.title}
                    </p>
                    <p className={styles.productSerialNumberText}>
                        {props.product.serialNumber}
                    </p>
                </div>
            </div>
            <p
                className={`${styles.freeText} ${
                    props.product.isNew == 0
                        ? styles.textBlack
                        : styles.textGreen
                }`}
            >
                {props.product.isNew === 0 ? "В ремонете" : "Свободен"}
            </p>
            <Image
                src="/icons/trash-icon.png"
                alt="trash icon"
                width={12}
                height={13}
                className={styles.trashIcon}
            />
        </div>
    );
}
