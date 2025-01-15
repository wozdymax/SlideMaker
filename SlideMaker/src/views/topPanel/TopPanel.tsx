import { useContext, useState } from "react";
import { Button } from "../../components/button/Button";
import styles from "./TopPanel.module.css";
import { v4 as uuidv4 } from "uuid";
import { SlideObjType } from "../../storage/Slide";
import { BgSelector } from "../../components/bgSelector/BgSelector";
import { ImageUploader } from "../../components/imageUploader/ImageUploader";
import { ExportButton } from "../../components/button/ExportButton";
import { ImportButton } from "../../components/button/ImportButton";
import { useAppActions } from "../hooks/useAppActions";
import { useAppSelector } from "../hooks/useAppSelector";
import { HistoryContext } from "../hooks/historyContext";
import { generatePDF } from "../../storage/functions/generatePDF";

const TopPanel = () => {
    const { renamePresentation, addSlide, deleteSlide, addSlideObj, deleteSlideObj, setEditor } = useAppActions();
    const presentation = useAppSelector((editor) => editor.presentation);
    const history = useContext(HistoryContext);
    const [isBgSelectorOpen, setIsBgSelectorOpen] = useState(false);

    const onTitleChange: React.ChangeEventHandler = (event) => {
        renamePresentation((event.target as HTMLInputElement).value);
    };

    const onAddText = () => {
        addSlideObj({
            id: uuidv4(),
            position: { x: 100, y: 100 },
            size: { w: 150, h: 90 },
            isSelected: false,
            type: SlideObjType.text,
            textcontent: "Новый текст",
            font: "Arial",
            fontsize: 18,
            fontcolor: "#000000",
            bgcolor: null,
        });
    };

    const handleImport = (data: any) => {
        localStorage.setItem("editorState", JSON.stringify(data));
        alert("Документ импортирован.");
    };

    const onUndo = () => {
        const newEditor = history.undo();
        if (newEditor) {
            setEditor(newEditor);
        }
    };

    const onRedo = () => {
        const newEditor = history.redo();
        if (newEditor) {
            setEditor(newEditor);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.ctrlKey && event.code === "KeyZ") {
            event.preventDefault();
            onUndo();
        }
        if (event.ctrlKey && event.code === "KeyY") {
            event.preventDefault();
            onRedo();
        }
    };
    const handleGeneratePDF = () => {
        generatePDF(presentation);
    };

    return (
        <div className={styles.topPanel} onKeyDown={handleKeyDown}>
            <input className={styles.title} type="text" value={presentation.name} onChange={onTitleChange} />
            <div className={styles.buttons}>
                <Button text="Добавить слайд" onClick={addSlide} className={styles.button} />
                <Button text="Удалить слайд" onClick={deleteSlide} className={styles.button} />
                <Button text="Добавить текст" onClick={onAddText} className={styles.button} />
                <ImageUploader imgType="obj" />
                <Button text="Удалить объект" onClick={deleteSlideObj} className={styles.button} />
                <div className={styles.button}>
                    <Button text="Изменить фон" onClick={() => setIsBgSelectorOpen(true)} className={styles.buton} />
                    <BgSelector isOpen={isBgSelectorOpen} onClose={() => setIsBgSelectorOpen(false)} />
                </div>
                <ImportButton className={styles.button} onImport={handleImport} />
                <ExportButton className={styles.button} />
                <Button className={styles.button} text={"Undo"} onClick={onUndo}></Button>
                <Button className={styles.button} text={"Redo"} onClick={onRedo}></Button>
                <Button className={styles.button} text={"PDF"} onClick={handleGeneratePDF} />
            </div>
        </div>
    );
};

export { TopPanel };
