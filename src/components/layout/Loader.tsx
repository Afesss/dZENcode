import { basePath } from "@/utils/halpers";
import styles from "./loader.module.css";
import Image from "next/image";
export default function Loader() {
    return (
        <div className={styles.loader}>
            <Image
                src={`${basePath}/icons/loading-icon.svg`}
                alt="Loading"
                width={100}
                height={100}
                className={styles.icon}
            />
        </div>
    );
}
