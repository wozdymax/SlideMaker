import { useMemo } from "react"
import { Button } from "../../components/button/Button"
import styles from "./TopPanel.module.css"
import { dispatch } from "../../storage/editor"
import { v4 as uuidv4 } from 'uuid';
import { BgType, SlideObjType } from "../../storage/Slide"
import { addSlideEditor } from "../../storage/functions/AddSlide"
import { deleteSlidesEditor } from "../../storage/functions/DeleteSlides";
import { addSlideObjEditor } from "../../storage/functions/AddSlideObj";
import { deleteSlideObj } from "../../storage/functions/DeleteSlideObj";
import { renamePresentationEditor } from "../../storage/functions/RenamePresentation";
import { EditBackroundToColor } from "../../storage/functions/EditBackground";

type TopPanelProps = {
    name: string,
}

const TopPanel = ({name}: TopPanelProps) => {
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
            textcontent: "Добавили текст", 
            font: "Arial", fontsize: 18, 
            fontcolor: "#000000", 
            bgcolor: null
        })
    }

    const onAddImage = () => {
        dispatch(addSlideObjEditor, {
            id: uuidv4(),
            position: {x: 400, y: 200}, 
            size: {w: 140, h:140}, 
            isSelected: false, 
            type: SlideObjType.image,
            url: "https://i.pinimg.com/736x/c0/70/8d/c0708d13bed5d20669af1061a22f5bf9.jpg"
        })
    }

    const onDeleteObj = () => {
        dispatch(deleteSlideObj)        
    }

    const onEditBackground = () => {
        dispatch(EditBackroundToColor, {type: BgType.color, color: "#93f4a2"})
    }

    const buttons = useMemo(() => [
        {id: 'add', text: 'Добавить слайд', onClick: onAddSlide},
        {id: 'delete', text: 'Удалить слайд', onClick: onDeleteSlides},
        {id: 'addTxt', text: 'Добавить текст', onClick: onAddText},
        {id: 'addImg', text: 'Добавить картинку', onClick: onAddImage},
        {id: 'delObj', text: 'Удалить объект', onClick: onDeleteObj},
        {id: 'editBg', text: 'Изменить фон', onClick: onEditBackground},
    ], [])

    return(
        <div className={styles.topPanel}>
            <input className={styles.title} type="text" value={name} onChange={onTitleChange}/>
            <div className={styles.buttons}>
                {buttons.map(button => <Button
                    key={button.id}
                    text={button.text}
                    onClick={button.onClick}
                    className={styles.button}
                />)} 
            </div>
        </div>
    )
}

export {TopPanel}

