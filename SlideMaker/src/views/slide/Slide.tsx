import { BgType, Position, Size, SlideObjType, SlideType, updateSlideObjSize } from "../../storage/Slide.ts";
import { TextObject } from "./TextObj.tsx";
import { ImageObject } from "./ImageObj.tsx";
import styles from "./Slide.module.css";
import { CSSProperties} from "react";
import { SelectionObj } from "../../storage/EditorType.ts";
import { dispatch } from "../../storage/editor.ts";
import { useObjectDnD } from "../../hooks/useObjectDnD.ts";

const SLIDE_WIDTH = 935;
const SLIDE_HEIGHT = 525;
const maxSize: Size = {w: SLIDE_WIDTH, h: SLIDE_HEIGHT}

type SlideProps = {
  slide: SlideType;
  scale?: number;
  isSelected: boolean;
  className: string;
  selectionObj: SelectionObj;
  onObjectMove?: (slideObjId: string, newPosition: Position) => void;
};

const Slide = ({ slide, scale = 1, className, isSelected, selectionObj, onObjectMove }: SlideProps) => {
  const { handleMouseDown, handleMouseMove, handleMouseUp, onObjClick } = useObjectDnD(
      slide,
      scale,
      selectionObj,
      onObjectMove
  );

  const slideStyles: CSSProperties = {
      width: `${SLIDE_WIDTH * scale}px`,
      height: `${SLIDE_HEIGHT * scale}px`,
  };

  switch (slide.background.type) {
      case BgType.color:
          slideStyles.background = slide.background.color;
          break;
      case BgType.image:
          slideStyles.backgroundImage = `url(${slide.background.url})`;
          slideStyles.backgroundSize = "cover";
          break;
  }

  if (isSelected) {
      slideStyles.border = "3px solid #0b57d0";
  }

  const handleResize = (slideObjId: string, newSize: Size) => {
      dispatch(updateSlideObjSize, { slideObjId, newSize });
  };

  return (
      <div
          style={slideStyles}
          className={styles.slide + " " + className}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
      >
          {slide.content.map((slideObj) => {
              switch (slideObj.type) {
                  case SlideObjType.image:
                      return (
                          <div
                              key={slideObj.id}
                              onClick={() => onObjClick(slideObj.id)}
                              onMouseDown={(e) => handleMouseDown(e, slideObj.id)}
                          >
                              <ImageObject
                                  imageObject={slideObj}
                                  scale={scale}
                                  maxSize={maxSize}
                                  isSelected={slideObj.id == selectionObj.selectedObjId}
                                  onResize={handleResize}
                              />
                          </div>
                      );
                  case SlideObjType.text:
                      return (
                          <div
                              key={slideObj.id}
                              onClick={() => onObjClick(slideObj.id)}
                              onMouseDown={(e) => handleMouseDown(e, slideObj.id)}
                          >
                              <TextObject
                                  textObject={slideObj}
                                  scale={scale}
                                  maxSize={maxSize}
                                  isSelected={slideObj.id == selectionObj.selectedObjId}
                                  onResize={handleResize}
                              />
                          </div>
                      );
              }
          })}
      </div>
  );
};

export { Slide };