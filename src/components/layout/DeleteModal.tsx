"use client";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import styles from "./delete-modal.module.css";
import { RootState } from "@/utils/redux/redux-store";
import Image from "next/image";
import {
    deleteItem,
    hideDeleteModal,
} from "@/utils/redux/slices/delete-modal-slice";
import { AnimatePresence, motion } from "motion/react";

export default function DeleteModal() {
    const deleteModal = useAppSelector((state: RootState) => state.deleteModal);
    const dispatch = useAppDispatch();
    return (
        <div>
            <AnimatePresence>
                {deleteModal.showModal && (
                    <motion.div
                        className={styles.background}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className={styles.modal}>
                            <div className={styles.header}>
                                <p className={styles.deleteText}>
                                    {deleteModal.message}
                                </p>
                            </div>
                            <div className={styles.center}>
                                <div className={styles.circle}></div>
                                {deleteModal.deleteItemIconPath.trim() !==
                                    "" && (
                                    <Image
                                        src={`${deleteModal.deleteItemIconPath}`}
                                        alt="icon"
                                        width={44}
                                        height={34}
                                        className={styles.icon}
                                    />
                                )}
                                <div className={styles.titleContainer}>
                                    <p className={styles.titleText}>
                                        {deleteModal.deleteItemTitle}
                                    </p>
                                    {deleteModal.deleteItemSerialNumber.trim() !==
                                        "" && (
                                        <p className={styles.specificationText}>
                                            {deleteModal.deleteItemSerialNumber}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className={styles.footer}>
                                <button
                                    className={styles.cancelButton}
                                    onClick={() => dispatch(hideDeleteModal())}
                                >
                                    ОТМЕНИТЬ
                                </button>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => dispatch(deleteItem())}
                                >
                                    <Image
                                        src="/icons/red-trash-icon.png"
                                        alt="Trash icon"
                                        width={12}
                                        height={14}
                                    />
                                    <p>УДАЛИТЬ</p>
                                </button>
                            </div>
                            <div
                                className={styles.closeBuble}
                                onClick={() => dispatch(hideDeleteModal())}
                            >
                                <Image
                                    src="/icons/close-icon.svg"
                                    alt="close icon"
                                    width={18}
                                    height={18}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
