import styles from "./search.module.css";

interface Props {
    className?: string;
}
export default function Search(props: Props) {
    return (
        <input
            className={`${styles.search} ${props.className}`}
            placeholder="Поиск"
        />
    );
    // return <div className={`${styles.search} ${props.className}`}></div>;
}
