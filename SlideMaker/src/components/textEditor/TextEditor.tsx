import { useState, useRef, useEffect } from "react";
import styles from "./TextEditor.module.css";
import { Select } from "../select/Select.tsx";
import { fontFamilies, fontSizes } from "../select/options.ts";
import { useAppActions } from "../../views/hooks/useAppActions.ts";

type TextEditorProps = {
    initialText: string;
    initialFontFamily: string;
    initialFontSize: number;
    initialFontColor: string;
    onClose: () => void;
    objectId: string;
};

const TextEditor = ({
    initialText,
    initialFontFamily,
    initialFontSize,
    initialFontColor,
    onClose,
    objectId,
}: TextEditorProps) => {
    const { editText } = useAppActions();
    const [text, setText] = useState(initialText);
    const [fontFamily, setFontFamily] = useState(initialFontFamily);
    const [fontSize, setFontSize] = useState(initialFontSize);
    const [fontColor, setFontColor] = useState(initialFontColor);
    const editorRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
    }, []);

    const handleSave = () => {
        editText(objectId, text, fontFamily, fontSize, fontColor);
        onClose();
    };

    const handleFontFamilySelect = (value: string) => {
        setFontFamily(value);
    };

    const handleFontSizeSelect = (value: string) => {
        setFontSize(Number(value));
    };

    return (
        <div className={styles.editor} style={{ top: 0 }}>
            <div className={styles.controls}>
                <Select
                    mode="cells"
                    options={fontFamilies}
                    selected={fontFamily || "Arial"}
                    onChange={handleFontFamilySelect}
                />
                <Select mode="cells" options={fontSizes} selected={fontSize || 16} onChange={handleFontSizeSelect} />
                <input
                    type="color"
                    value={fontColor}
                    onChange={(e) => setFontColor(e.target.value)}
                    className={styles.colorPicker}
                />
            </div>
            <textarea
                ref={editorRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={styles.textarea}
                style={{
                    fontFamily: fontFamily,
                    fontSize: `${fontSize}px`,
                }}
            />
            <div className={styles.buttons}>
                <button onClick={handleSave} className={styles.saveButton}>
                    Сохранить
                </button>
                <button onClick={onClose} className={styles.cancelButton}>
                    Отмена
                </button>
            </div>
        </div>
    );
};

export { TextEditor };
