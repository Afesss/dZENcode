"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import {
    deleteProductApi,
    getAllProductsApi,
    ProductData,
} from "@/api/product-api";
import Loader from "@/components/layout/Loader";
import Dropdown from "@/components/utils/Dropdown";
import Product from "./Product";
import { getAllOrdersApi } from "@/api/orders-api";
import { OrdersProductsData } from "../orders/page";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { RootState } from "@/utils/redux/redux-store";
import { hideDeleteModal } from "@/utils/redux/slices/delete-modal-slice";

export default function ProductsPage() {
    const [data, setData] = useState<OrdersProductsData | null>(null);
    const [productTypes, setProductTypes] = useState<string[]>([]);
    const [productSpecifications, setProductSpecifications] = useState<
        string[]
    >([]);
    const [typeFilter, setTypeFilter] = useState<string>("All");
    const [specificationFilter, setSpecificationFilter] =
        useState<string>("All");
    const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
    const deleteModal = useAppSelector((state: RootState) => state.deleteModal);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (deleteModal.delete) {
            deleteProduct(Number.parseInt(deleteModal.deleteItemId));
            dispatch(hideDeleteModal());
        }
    }, [deleteModal]);

    useEffect(() => {
        getDataFromServer();
    }, []);

    useEffect(() => {
        if (data) {
            filterProducts(data.products);
        }
    }, [typeFilter, specificationFilter]);

    const deleteProduct = async (id: number) => {
        await deleteProductApi(id);
        const productsFromBack = await getAllProductsApi();
        if (productsFromBack) {
            setData({
                products: productsFromBack,
                orders: data ? data.orders : [],
            });
            filterProducts(productsFromBack);
        }
    };

    const getDataFromServer = async () => {
        const productsFromBack = await getAllProductsApi();
        const ordersFromBack = await getAllOrdersApi();
        if (productsFromBack && ordersFromBack) {
            setData({ products: productsFromBack, orders: ordersFromBack });
            filterProducts(productsFromBack);
            setProductTypes(getProductTypes(productsFromBack));
            setProductSpecifications(
                getProductSpecifications(productsFromBack)
            );
        }
    };

    const getProductTypes = (products: ProductData[]): string[] => {
        return [...new Set(products.map((product) => product.type))];
    };

    const getProductSpecifications = (products: ProductData[]): string[] => {
        return [...new Set(products.map((product) => product.specification))];
    };

    const filterProducts = (products: ProductData[]) => {
        const fProducts = products.filter((product) => {
            if (
                (typeFilter.toLowerCase() !== "all" &&
                    typeFilter !== product.type) ||
                (specificationFilter.toLowerCase() !== "all" &&
                    specificationFilter != product.specification)
            ) {
                return false;
            }
            return true;
        });
        setFilteredProducts(fProducts);
    };

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <div className={styles.titleContainer}>
                    <p
                        className={styles.title}
                    >{`Подукты / ${filteredProducts.length}`}</p>
                    <div className={styles.typeContainer}>
                        <p className={styles.dropdownTitleText}>Тип:</p>
                        <Dropdown
                            className={styles.dropdown}
                            values={productTypes}
                            onNewValueSelected={(value) => setTypeFilter(value)}
                        />
                    </div>
                    <div className={styles.specificationContainer}>
                        <p className={styles.dropdownTitleText}>
                            Спецификация:
                        </p>
                        <Dropdown
                            className={styles.dropdown}
                            values={productSpecifications}
                            onNewValueSelected={(value) =>
                                setSpecificationFilter(value)
                            }
                        />
                    </div>
                </div>
                <div className={styles.productsContainer}>
                    {filteredProducts.map((product) => {
                        return (
                            <Product
                                key={product.id}
                                product={product}
                                orders={data ? data.orders : []}
                            />
                        );
                    })}
                </div>
                {!data && <Loader />}
            </div>
        </div>
    );
}
