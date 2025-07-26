import styles from "./order-icon.module.css";

export default function OrderIcon() {
    return (
        <div className={styles.icon}>
            <div className={styles.content}>
                <div className={styles.circle}></div>
                <div className={styles.rectangle}></div>
            </div>
            <div className={styles.content}>
                <div className={styles.circle}></div>
                <div className={styles.rectangle}></div>
            </div>
            <div className={styles.content}>
                <div className={styles.circle}></div>
                <div className={styles.rectangle}></div>
            </div>
        </div>
    );
}
