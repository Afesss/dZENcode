import { useEffect, useRef, useState } from "react";
import styles from "./dropdown.module.css";
import Image from "next/image";
import { MouseEvent } from "react";
import { basePath } from "@/utils/halpers";

interface Props {
    className: string;
    values: string[];
    onNewValueSelected: (value: string) => void;
}

export default function Dropdown(props: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>("All");
    const [values, setValues] = useState<string[]>(["All"]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setValues([...props.values, "All"]);
    }, [props.values]);

    useEffect(() => {
        const handleClickOutside = (event: globalThis.MouseEvent) => {
            if (
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOnValue = (
        e: MouseEvent<HTMLDivElement>,
        value: string
    ) => {
        e.stopPropagation();
        setSelectedValue(value);
        setIsOpen(false);
        props.onNewValueSelected(value);
    };

    return (
        <button
            ref={buttonRef}
            className={`${props.className} ${styles.dropdown}`}
            onClick={() => setIsOpen(true)}
        >
            <p className={styles.title}>{selectedValue}</p>
            <Image
                src={`${basePath}/icons/dropdown-icon.png`}
                alt="dropdown icon"
                width={5}
                height={4}
            />
            {isOpen && (
                <div className={styles.dropdownMenu}>
                    {values.map((value) => {
                        if (value === selectedValue) return;
                        return (
                            <div
                                key={value}
                                className={styles.dropdownMenuElement}
                                onClick={(e) => handleClickOnValue(e, value)}
                            >
                                {value}
                            </div>
                        );
                    })}
                </div>
            )}
        </button>
    );
}
