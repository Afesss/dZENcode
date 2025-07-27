import axios from "axios";
import { ordersUrl } from "./urls";

let orders: OrderData[] | undefined = undefined;
export const getAllOrdersApi = async () => {
    if (orders) {
        return orders;
    }
    try {
        const response = await axios.get<OrderData[]>(ordersUrl);
        if (response.status === 200) {
            orders = response.data;
            return response.data;
        } else {
            console.error("Failed to load orders:", response.statusText);
        }
    } catch (error) {
        console.error(error);
    }
    return undefined;
};

export const deleteOrderApi = (id: number) => {
    if (orders) {
        orders = orders.filter((order) => order.id != id);
    }
};

export type OrderData = {
    id: number;
    title: string;
    date: string;
    description: string;
};
