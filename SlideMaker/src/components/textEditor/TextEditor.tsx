import { useState, useRef, useEffect } from 'react';
import styles from './TextEditor.module.css';
import { dispatch } from '../../storage/editor.ts';
import { editText } from '../../storage/functions/EditText.ts';
import { Select } from '../select/Select.tsx';
import { fontFamilies, fontSizes } from '../select/options.ts';

type TextEditorProps = {
    initialText: string;
    initialFontFamily?: string;
    initialFontSize?: number;
    onClose: () => void;
    objectId: string;
};

const TextEditor = ({ 
    initialText, 
    initialFontFamily,
    initialFontSize, 
    onClose, 
    objectId 
}: TextEditorProps) => {
    const [text, setText] = useState(initialText);
    const [fontFamily, setFontFamily] = useState(initialFontFamily);
    const [fontSize, setFontSize] = useState(initialFontSize);
    const editorRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
    }, []);

    const handleSave = () => {
        dispatch(editText, { 
            objectId, 
            text,
            fontFamily,
            fontSize 
        });
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
                mode='cells'
                options={fontFamilies}
                selected={fontFamily || 'Arial'}
                onChange={handleFontFamilySelect}
            />
            <Select
                mode='cells'
                options={fontSizes}
                selected={fontSize || 16}
                onChange={handleFontSizeSelect}
            />
            </div>
            <textarea
                ref={editorRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={styles.textarea}
                style={{ 
                    fontFamily: fontFamily,
                    fontSize: `${fontSize}px`
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

export {TextEditor}