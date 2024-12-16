import { PresentationType } from "./Presentation"
import { createSlide, SlideType } from "./Slide"

const addSlide = (pres: PresentationType, newSlide: SlideType): PresentationType => {
    return{...pres, slides: [...pres.slides, newSlide]};
}

const deleteSlides = (pres: PresentationType, ids: string[]): PresentationType => {
    const newSlideCollection = pres.slides.filter((slide) => !ids.includes(slide.id));
    if (newSlideCollection.length > 0) {
        return{...pres, slides: newSlideCollection}
    }
    const newSlide: SlideType = createSlide();
    return{...pres, slides: [newSlide]} 
}

const moveSlides = (pres: PresentationType, ids: string[], movePosition: number): PresentationType => {
    const movingSlides = pres.slides.filter((slide) => ids.includes(slide.id));
    const remainingSlides = pres.slides.filter((slide) => !ids.includes(slide.id));
    const newSlideCollection = [...remainingSlides.slice(0, movePosition), ...movingSlides, ...remainingSlides.slice(movePosition)];
  
    return {...pres, slides: newSlideCollection};
}

export{addSlide, deleteSlides, moveSlides}