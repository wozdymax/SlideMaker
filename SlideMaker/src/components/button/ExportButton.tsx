import { useRef } from "react";
import styles from "./Button.module.css";
import { useAppSelector } from "../../views/hooks/useAppSelector";
type ExportButtonProps = {
    className: string;
};
const ExportButton = ({ className }: ExportButtonProps) => {
    const name = useAppSelector((editor) => editor.presentation.name);
    const downloadRef = useRef<HTMLAnchorElement | null>(null);
    const handleExport = () => {
        const editorData = localStorage.getItem("editorState");
        if (!editorData) {
            alert("Нет данных для экспорта.");
            return;
        }
        const blob = new Blob([editorData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        if (downloadRef.current) {
            downloadRef.current.href = url;
            downloadRef.current.download = name + ".json";
            downloadRef.current.click();
            URL.revokeObjectURL(url);
        }
    };
    return (
        <>
            <button className={`${className} ${styles.button}`} onClick={handleExport}>
                Экспорт
            </button>
            <a ref={downloadRef} style={{ display: "none" }}>
                Скачать
            </a>
        </>
    );
};
export { ExportButton };
