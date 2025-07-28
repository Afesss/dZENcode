"use client";
import Link from "next/link";
import styles from "./nav-menu.module.css";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import Image from "next/image";
import { basePath } from "@/utils/halpers";

const links = [
    { href: "/orders", label: "ПРИХОД" },
    { href: "/groups", label: "ГРУППЫ" },
    { href: "/products", label: "ПРОДУКТЫ" },
    { href: "/users", label: "ПОЛЬЗОВАТЕЛИ" },
    { href: "/settings", label: "НАСТРОЙКИ" },
];

export default function NavMenu() {
    const pathname = usePathname();
    const linkRef = useRef<HTMLAnchorElement>(null);
    return (
        <div className={styles.navPanel}>
            <Image
                src={`${basePath}/avatar.jpg`}
                alt="avatar"
                width={95}
                height={95}
                className={styles.avatar}
            />
            <div className={styles.settingsIcon}>
                <Image
                    src={`${basePath}/icons/settings-icon.png`}
                    alt="settings icon"
                    width={15}
                    height={15}
                />
            </div>
            <nav className={styles.navMenu}>
                {links.map(({ href, label }) => {
                    return (
                        <Link
                            key={href}
                            ref={linkRef}
                            href={href}
                            className={`${styles.link} ${
                                pathname === href && styles.active
                            }`}
                        >
                            {label}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
