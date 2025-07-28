"use client";
import { ProductData } from "@/api/product-api";
import styles from "./available-produc.module.css";
import Image from "next/image";
import { MouseEvent } from "react";
import { useAppDispatch } from "@/utils/redux/hooks";
import { showDeleteModal } from "@/utils/redux/slices/delete-modal-slice";
import { deleteProductMessage } from "../products/Product";
import { basePath } from "@/utils/halpers";

interface Props {
    product: ProductData;
    minTitleWidth: number;
}

export default function AvailableProduct(props: Props) {
    const dispatch = useAppDispatch();

    const handleDelete = (e: MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
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
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <div className={styles.circle}></div>
                <Image
                    src={`${basePath}${props.product.photo}`}
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
                src={`${basePath}/icons/trash-icon.png`}
                alt="trash icon"
                width={12}
                height={13}
                className={styles.trashIcon}
                onClick={(e) => handleDelete(e)}
            />
        </div>
    );
}
