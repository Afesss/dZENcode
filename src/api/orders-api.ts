import axios from "axios";
import { ordersUrl } from "./urls";

export const getAllOrdersApi = async () => {
    try {
        const response = await axios.get<OrderData[]>(ordersUrl);
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

export type OrderData = {
    id: number;
    title: string;
    date: string;
    description: string;
};
