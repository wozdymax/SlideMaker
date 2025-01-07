import styles from './ImageUploader.module.css';
import { dispatch } from '../../storage/editor.ts';
import { addSlideObjEditor } from '../../storage/functions/AddSlideObj.ts';
import { createImgSlideObj, ImageObj } from '../../storage/Slide.ts';
import { EditBackroundToImage } from '../../storage/functions/EditBackground.ts';

type ImageProps = { imgType: string }

const ImageUploader = ({imgType}: ImageProps) => {
    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target?.result as string;

                if (imgType == "obj"){
                    const img: ImageObj = createImgSlideObj({x:200, y: 140}, {w:150, h:180}, imageUrl);
                    dispatch(addSlideObjEditor, img);
                }
                else if (imgType == "bg") {
                    dispatch(EditBackroundToImage, imageUrl)
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.uploader}>
            <label className={styles.uploadButton}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className={styles.fileInput}
                />
                Добавить изображение
            </label>
        </div>
    );
};

export {ImageUploader}
