import { useState } from "react"
import { Button } from "../../components/button/Button"
import styles from "./TopPanel.module.css"
import { dispatch } from "../../storage/editor"
import { v4 as uuidv4 } from 'uuid';
import { BgType, SlideObjType } from "../../storage/Slide"
import { addSlideEditor } from "../../storage/functions/AddSlide"
import { deleteSlidesEditor } from "../../storage/functions/DeleteSlides";
import { addSlideObjEditor } from "../../storage/functions/AddSlideObj";
import { deleteSlideObjEditor } from "../../storage/functions/DeleteSlideObj";
import { renamePresentationEditor } from "../../storage/functions/RenamePresentation";
import { ColorPicker } from "../../components/colorPicker/ColorPicker";
import { ImageUploader } from "../../components/imageUploader/ImageUploader";
import { ExportButton } from "../../components/button/ExportButton";
import { ImportButton } from "../../components/button/ImportButton";

type TopPanelProps = {
    name: string,
}

const TopPanel = ({name}: TopPanelProps) => {
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentationEditor, (event.target as HTMLInputElement).value)
    }

    const onAddSlide = ():void => {
         dispatch(addSlideEditor, {id: uuidv4(), background: {type: BgType.color, color: "#ffffff"}, content: [], isSelected: false})
    }

    const onDeleteSlides = () => {
        dispatch(deleteSlidesEditor)
    }

    const onAddText = () => {
        dispatch(addSlideObjEditor, {
            id: uuidv4(),
            position: {x: 100, y: 100}, 
            size: {w: 150, h: 90}, 
            isSelected: false, 
            type: SlideObjType.text, 
            textcontent: "Новый текст", 
            font: "Arial", fontsize: 18, 
            fontcolor: "#000000", 
            bgcolor: null
        })
    }

    const onDeleteObj = () => {
        dispatch(deleteSlideObjEditor)        
    }

    const handleImport = (data: any) => {
        localStorage.setItem("editorState", JSON.stringify(data))
        alert("Документ импортирован.")
    }

    return(
        <div className={styles.topPanel}>
            <input className={styles.title} type="text" value={name} onChange={onTitleChange}/>
            <div className={styles.buttons}>
                <Button text='Добавить слайд' onClick={onAddSlide} className={styles.button} />
                <Button text='Удалить слайд' onClick={onDeleteSlides} className={styles.button} />
                <Button text='Добавить текст' onClick={onAddText} className={styles.button} />
                <ImageUploader />
                <Button text='Удалить объект' onClick={onDeleteObj} className={styles.button} />
                <div className={styles.button}>
                    <Button text='Изменить фон' onClick={() => setIsColorPickerOpen(true)} className={styles.buton} />
                    <ColorPicker isOpen={isColorPickerOpen} onClose={() => setIsColorPickerOpen(false)} />
                </div>
                <ImportButton className={styles.button} onImport={handleImport}/>
                <ExportButton className={styles.button} presentatationName={name}/>
            </div>
        </div>
    )
}

export {TopPanel}

