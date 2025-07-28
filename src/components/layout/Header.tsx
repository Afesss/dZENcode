"use client";
import Link from "next/link";
import styles from "./header.module.css";
import Image from "next/image";
import Search from "./Search";
import { useEffect, useState } from "react";
import { getFormatDate, getFormatTime } from "@/utils/halpers";
import { time } from "console";

type DateDatea = {
    date: string;
    time: string;
};

export default function Header() {
    const [date, setDate] = useState<DateDatea>({
        date: getFormatDate(new Date()),
        time: getFormatTime(new Date()),
    });
    useEffect(() => {
        const interval = setInterval(() => {
            const d = new Date();
            setDate({ date: getFormatDate(d), time: getFormatTime(d) });
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <header className={styles.header}>
            <div className={styles.leftSide}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/icons/icon.png"
                        alt="icon"
                        width={36}
                        height={44}
                    />
                </Link>
                <p className={styles.title}>INVENTORY</p>
                <Search className={styles.search} />
            </div>
            <div className={styles.rightSide}>
                <div>
                    <p className={`${styles.rightSideText} ${styles.dayText}`}>
                        Вторник
                    </p>
                </div>
                <div className={`flex ${styles.data}`}>
                    <p className={`${styles.rightSideText} ${styles.dataText}`}>
                        {date.date}
                    </p>
                    <Image
                        className={styles.timeIcon}
                        src="/icons/time-icon.png"
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
