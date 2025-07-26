import axios from "axios";
import { productsUrl } from "./urls";

export const getAllProductsApi = async () => {
    try {
        const response = await axios.get<ProductData[]>(productsUrl);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Failed to load orders:", response.statusText);
        }
    } catch (error) {
        console.error(error);
    }
    return undefined;
};

export type ProductData = {
    id: number;
    serialNumber: number;
    isNew: number;
    photo: string;
    title: string;
    type: string;
    specification: string;
    guarantee: {
        start: string;
        end: string;
    };
    price: [
        {
            value: number;
            symbol: string;
            isDefault: number;
        },
        {
            value: number;
            symbol: string;
            isDefault: number;
        },
        {
            value: number;
            symbol: string;
            isDefault: number;
        }
    ];
    order: number;
    date: string;
};
