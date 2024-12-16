import { addSlide, deleteSlides, moveSlides} from "../SlideColection"
import { SlideType, BgType } from "../Slide"
import { createPresentation, PresentationType } from "../Presentation";

describe("SlideCollection", () => {
    const slide1: SlideType = {id: "1", background: {type: BgType.color, color:"#000000"}, content: [], isSelected: false};
    const slide2: SlideType = {id: "2", background: {type: BgType.image, url:"Car.img"}, content: [], isSelected: false};
    const slide3: SlideType = {id: "3", background: {type: BgType.color, color:"#000000"}, content: [], isSelected: false};
    const slide4: SlideType = {id: "4", background: {type: BgType.image, url:"Pen.img"}, content: [], isSelected: false};

    describe("Add slides", () => {
        let pres: PresentationType = createPresentation();
        it("should add slides to collection", () => {
            pres = addSlide(pres, slide1);
            pres = addSlide(pres, slide2);
            pres = addSlide(pres, slide3);
            expect(pres).toEqual({name: pres.name, slides: [slide1, slide2, slide3]})
        });
    });

    describe("Delete slides", () => {
        const pres: PresentationType = {name: "Test name", slides: [slide1, slide2, slide3]};
        it("should return collection without changes, if given array ids is empty", () => {
            expect(deleteSlides(pres, [])).toEqual({name: pres.name, slides: [slide1, slide2, slide3]});
        });
        it("should delete slides with given ids from collection", () => {
            expect(deleteSlides(pres, ["1", "3"])).toEqual({name: pres.name, slides: [slide2]});
        });
        it("should don`t delete slides from collection if given ids don`t exist", () => {
            expect(deleteSlides(pres, ["6"])).toEqual({name: pres.name, slides: [slide1, slide2, slide3]});
        });
    });

    describe("Move slides", () => {
        const pres: PresentationType = {name: "Test name", slides: [slide1, slide2, slide3, slide4]};
        it("should move 1 slide to given position", () => {
            expect(moveSlides(pres, ["1"], 2)).toEqual({name: pres.name, slides:[slide2, slide3, slide1, slide4]})
        });
        it("should move all slides with given ids to given position", () => {
            expect(moveSlides(pres, ["1", "2"], 1)).toEqual({name: pres.name, slides:[slide3, slide1, slide2, slide4]})
        });
        it("should return collection with same slides order if slide with given ids don`t exist", () => {
            expect(moveSlides(pres, ["6"], 1)).toEqual({name: pres.name, slides:[slide1, slide2, slide3, slide4]})
        });
        it("should move slide to end of collection if position bigger than collection size", () => {
            expect(moveSlides(pres, ["1"], 7)).toEqual({name: pres.name, slides:[slide2, slide3, slide4, slide1]})
        });
    });
});