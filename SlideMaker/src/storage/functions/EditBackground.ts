import { EditorType } from "../EditorType";
import { BgColor, BgType, changeBackgroundToColor, changeBackgroundToImage } from "../Slide";

const EditBackroundToColor = (editor: EditorType, color: BgColor): EditorType => {
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

const EditBackroundToImage = (editor: EditorType, url: string): EditorType => {
  console.log(url);
  const activeSlideIndex = editor.presentation.slides.findIndex(
    (slide) => slide.id == editor.selectionSlide?.selectedSlideId,
  );
  console.log("ququq");

  const newSlides = [...editor.presentation.slides];
  newSlides[activeSlideIndex] = changeBackgroundToImage(newSlides[activeSlideIndex], { type: BgType.image, url: url });
  console.log("ququq");

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: newSlides,
    },
  };
};

export { EditBackroundToColor, EditBackroundToImage };
