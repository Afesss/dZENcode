"use client";
import Link from "next/link";
import styles from "./header.module.css";
import Image from "next/image";
import Search from "./Search";
import { useEffect, useState } from "react";
import {
    basePath,
    getFormatDate,
    getFormatDay,
    getFormatTime,
} from "@/utils/halpers";
import axios from "axios";
import { io } from "socket.io-client";

type DateDatea = {
    date: string;
    time: string;
    day: string;
};

export default function Header() {
    const [date, setDate] = useState<DateDatea>({
        date: getFormatDate(new Date()),
        time: getFormatTime(new Date()),
        day: getFormatDay(new Date()),
    });

    const [onlineUsers, setOnlineUsers] = useState<number>(0);

    useEffect(() => {
        console.log(basePath);
        axios.get(`${basePath}/api/socket`);
        const socket = io({ path: `${basePath}/api/socket` });
        socket.on("connect", () => {
            console.log("🟢 Socket connected");
        });
        socket.on("online-users", (data: number) => {
            setOnlineUsers(data);
        });

        const interval = setInterval(() => {
            const d = new Date();
            setDate({
                date: getFormatDate(d),
                time: getFormatTime(d),
                day: getFormatDay(d),
            });
        }, 1000);
        return () => {
            socket.disconnect();
            clearInterval(interval);
        };
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.leftSide}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src={`${basePath}/icons/icon.png`}
                        alt="icon"
                        width={36}
                        height={44}
                    />
                </Link>
                <p className={styles.title}>INVENTORY</p>
                <Search className={styles.search} />
            </div>
            <div className={styles.rightSide}>
                <div className="flex">
                    <p className={`${styles.rightSideText} ${styles.dayText}`}>
                        {date.day}
                    </p>
                    <p
                        className={`${styles.onlineUsersText} ${styles.dayText} ${styles.rightSideText}`}
                    >
                        {"Online: " + onlineUsers}
                    </p>
                </div>
                <div className={`flex ${styles.data}`}>
                    <p className={`${styles.rightSideText} ${styles.dataText}`}>
                        {date.date}
                    </p>
                    <Image
                        className={styles.timeIcon}
                        src={`${basePath}/icons/time-icon.png`}
                        alt="time icon"
                        width={15}
                        height={15}
                    />
                    <p className={`${styles.rightSideText}`}>{date.time}</p>
                </div>
            </div>
        </header>
    );
}
