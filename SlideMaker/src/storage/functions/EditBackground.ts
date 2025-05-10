import { EditorType } from "../EditorType";
import { BgColor, BgType, changeBackgroundToColor, changeBackgroundToImage } from "../Slide";

const editBackgroundToColor = (editor: EditorType, color: BgColor): EditorType => {
    const activeSlideIndex = editor.presentation.slides.findIndex(
        (slide) => slide.id == editor.selectionSlide?.selectedSlideId,
    );

    const newSlides = [...editor.presentation.slides];
    newSlides[activeSlideIndex] = changeBackgroundToColor(newSlides[activeSlideIndex], color);

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    };
};

const editBackgroundToImage = (editor: EditorType, url: string): EditorType => {
    const activeSlideIndex = editor.presentation.slides.findIndex(
        (slide) => slide.id == editor.selectionSlide?.selectedSlideId,
    );

    const newSlides = [...editor.presentation.slides];
    newSlides[activeSlideIndex] = changeBackgroundToImage(newSlides[activeSlideIndex], {
        type: BgType.image,
        url: url,
    });
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    };
};

export { editBackgroundToColor, editBackgroundToImage };
