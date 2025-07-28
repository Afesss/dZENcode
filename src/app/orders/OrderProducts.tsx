import { deleteProductApi, ProductData } from "@/api/product-api";
import AvailableProduct from "./AvailableProduct";
import styles from "./order-product.module.css";
import Image from "next/image";
import { MouseEvent } from "react";
import { motion } from "motion/react";
import { basePath } from "@/utils/halpers";
interface Props {
    orderTitle: string;
    products: ProductData[];
    onCloseClick: () => void;
}

export default function OrderProducts(props: Props) {
    const handleCloseClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        props.onCloseClick();
    };

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, scale: 0, left: "100%" }}
            animate={{ opacity: 1, scale: 1, left: "105%" }}
            exit={{ opacity: 0, scale: 0 }}
            style={{ transformOrigin: "left" }}
        >
            <p className={styles.orderTitle}>{props.orderTitle}</p>
            <div className={styles.addProductContainer}>
                <div className={styles.addProductCircle}>
                    <p>+</p>
                </div>
                <p>Добавить продукт</p>
            </div>
            <div className={styles.availableProductsContainer}>
                {props.products.map((product) => {
                    const minTitleWidth = Math.max(
                        ...props.products.map((p) => p.title.length)
                    );
                    return (
                        <AvailableProduct
                            key={product.id}
                            product={product}
                            minTitleWidth={minTitleWidth}
                        />
                    );
                })}
            </div>
            <button className={styles.closeButton} onClick={handleCloseClick}>
                <Image
                    src={`${basePath}/icons/close-icon.svg`}
                    alt="close icon"
                    width={18}
                    height={18}
                />
            </button>
        </motion.div>
    );
}
