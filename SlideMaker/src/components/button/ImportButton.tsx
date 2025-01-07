import React from "react";
import styles from "./Button.module.css";
import { validatePresentation } from "../../storage/schema";

type ImportButtonProps = {
    onImport: (data: any) => void,
    className: string,
}

const ImportButton = ({ onImport, className }: ImportButtonProps) => {
    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const text = await file.text();
            const data = JSON.parse(text);
            
            const { isValid, errors } = validatePresentation(data);
            
            if (!isValid) {
                throw new Error(`Неправильный формат презентации: ${JSON.stringify(errors)}`);
            }
            
            onImport(data);
        } catch (error) {
            alert(`Ошибка импорта файла: ${(error as Error).message}`);
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
};

export {ImportButton}
