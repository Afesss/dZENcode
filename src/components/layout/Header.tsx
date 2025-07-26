import Link from "next/link";
import styles from "./header.module.css";
import Image from "next/image";
import Search from "./Search";

export default function Header() {
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
                        06 апр, 2025
                    </p>
                    <Image
                        className={styles.timeIcon}
                        src="/icons/time-icon.png"
                        alt="time icon"
                        width={15}
                        height={15}
                    />
                    <p className={`${styles.rightSideText}`}>17:20</p>
                </div>
            </div>
        </header>
    );
}
