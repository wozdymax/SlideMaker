import React from "react";
import styles from "./Button.module.css";

type ImportButtonProps = {
    onImport: (data: any) => void,
    className: string,
}

function ImportButton({ onImport, className }: ImportButtonProps) {
    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const text = await file.text();
            const data = JSON.parse(text);
            onImport(data);
        } catch (error) {
            alert(`Invalid file format: ${(error as Error).message}`);
        }
    };

    return (
        <label className={`${className} ${styles.importButton}`}>
            <input
                type="file"
                accept="application/json"
                onChange={handleFileSelect}
                className={styles.fileInput}
            />
            Импортировать документ
        </label>
    );
}

export {ImportButton}
