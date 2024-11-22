import { Button } from "../../components/button/Button"
import styles from "./TopPanel.module.css"

type TopPanelProps = {
    name: string,
}

const TopPanel = ({name}: TopPanelProps) => {
    return(
        <div className={styles.topPanel}>
            <input className={styles.title} type="text" defaultValue={name}/>
            <div>
                <Button className={styles.button} text={'Добавить слайд'} onClick={() => {console.log("Add slide")}}></Button>
                <Button className={styles.button} text={'Удалить слайд'} onClick={() => {console.log("Delete slide")}}></Button>
                <Button className={styles.button} text={'Добавить текст'} onClick={() => {console.log("Add text object")}}></Button>
                <Button className={styles.button} text={'Добавить картинку'} onClick={() => {console.log("Add image object")}}></Button>
                <Button className={styles.button} text={'Удалить объект'} onClick={() => {console.log("Delete object from slide")}}></Button>
            </div>
        </div>
    )
}

export {TopPanel}