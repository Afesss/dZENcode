"use client";
import { useAppDispatch } from "@/utils/redux/hooks";
import styles from "./search.module.css";
import { ChangeEvent } from "react";
import { search } from "@/utils/redux/slices/search-slice";
interface Props {
    className?: string;
}

export default function Search(props: Props) {
    const dispatch = useAppDispatch();
    const onValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(search({ value: e.target.value }));
    };
    return (
        <input
            className={`${styles.search} ${props.className}`}
            placeholder="Поиск"
            onChange={(e) => onValueChanged(e)}
        />
    );
    // return <div className={`${styles.search} ${props.className}`}></div>;
}
