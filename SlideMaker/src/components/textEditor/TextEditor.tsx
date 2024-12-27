import { useState, useRef, useEffect } from 'react';
import styles from './TextEditor.module.css';
import { dispatch } from '../../storage/editor.ts';
import { editText } from '../../storage/functions/EditText.ts';

type TextEditorProps = {
    initialText: string;
    position: { x: number; y: number };
    onClose: () => void;
    objectId: string;
}

const TextEditor = ({ initialText, position, onClose, objectId }: TextEditorProps) => {
    const [text, setText] = useState(initialText);
    const editorRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.focus();
            editorRef.current.select();
        }
    }, []);

    const handleSave = () => {
        dispatch(editText, { objectId, text });
        onClose();
    };

    return (
        <div 
            className={styles.editor}
            style={{
                left: position.x,
                top: position.y
            }}
        >
            <textarea
                ref={editorRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={styles.textarea}
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

export {TextEditor}
