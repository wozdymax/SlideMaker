// import styles from './ColorPicker.module.css';
// import { dispatch } from '../../storage/editor.ts';
// import { setBackgroundColor } from '../../storage/Slide.ts';

// type ColorPickerProps = {
//     isOpen: boolean;
//     onClose: () => void;
// }

// const colors = [
//     "#ffffff", '#000000', '#FF0000', '#00FF00', '#0000FF',
//     '#FFFF00', '#FF00FF', '#00FFFF', '#808080', '#800000',
//     '#808000', '#008000', '#800080', '#008080', '#000080'
// ];

// const ColorPicker = ({ isOpen, onClose }: ColorPickerProps) => {
//     const handleColorSelect = (color: string) => {
//         dispatch(setBackgroundColor,  color );
//         onClose();
//     };

//     if (!isOpen) return null;

//     return (
//         <div className={styles.colorPicker}>
//             <div className={styles.colors}>
//                 {colors.map((color) => (
//                     <div
//                         key={color}
//                         className={styles.colorItem}
//                         style={{ backgroundColor: color }}
//                         onClick={() => handleColorSelect(color)}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export {ColorPicker}

import { useState } from 'react';
import styles from './ColorPicker.module.css';
import { setBackgroundColor } from '../../storage/Slide.ts';
import { dispatch } from '../../storage/editor.ts';

type ColorPickerProps = {
    isOpen: boolean;
    onClose: () => void;
}

const ColorPicker = ({ isOpen, onClose}: ColorPickerProps) => {
    const [customColor, setCustomColor] = useState('#ffffff');

    if (!isOpen) return null;

    const handleColorSelect = (color: string) => {
                dispatch(setBackgroundColor,  color );
                onClose();
            };

    return (
        <div className={styles.colorPicker}>
            <div className={styles.customColorSection}>
                <input 
                    type="color" 
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className={styles.colorInput}
                />
                <button 
                    onClick={() => handleColorSelect(customColor)}
                    className={styles.applyButton}
                >
                    Применить цвет
                </button>
            </div>
        </div>
    );
}

export {ColorPicker}