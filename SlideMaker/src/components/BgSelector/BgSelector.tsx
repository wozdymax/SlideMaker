import { useEffect, useRef, useState } from "react";
import styles from "./BgSelector.module.css";
import { BgType } from "../../storage/Slide.ts";
import { ImageUploader } from "../imageUploader/ImageUploader.tsx";
import { useAppActions } from "../../views/hooks/useAppActions.ts";

type BgSelectorProps = {
    isOpen: boolean;
    onClose: () => void;
};

const BgSelector = ({ isOpen, onClose }: BgSelectorProps) => {
    const { editBackgroundToColor } = useAppActions();

    const [customColor, setCustomColor] = useState("#ffffff");
    const selectorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    if (!isOpen) return null;

    const handleColorSelect = (color: string) => {
        editBackgroundToColor({ type: BgType.color, color: color });
        onClose();
    };

    return (
        <div ref={selectorRef} className={styles.colorPicker}>
            <div className={styles.customColorSection}>
                <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className={styles.colorInput}
                />
                <button onClick={() => handleColorSelect(customColor)} className={styles.applyButton}>
                    Применить цвет
                </button>
            </div>
            <ImageUploader imgType="bg" />
        </div>
    );
};

export { BgSelector };
