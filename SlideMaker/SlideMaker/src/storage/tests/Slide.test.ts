import { 
    addSlideObj,
    BgType, 
    changeBackgroundToColor, 
    changeBackgroundToImage,
    changeObjPosition, 
    changeObjSize, 
    createBaseSlideObj, 
    createImgSlideObj, 
    createSlide, 
    createTextSlideObj, 
    deleteSlideObjs, 
    editTextBgcolor, 
    editTextContent, 
    editTextFont, 
    editTextFontcolor, 
    editTextFontsize, 
    Position, 
    Size, 
    SlideObj, 
    SlideObjType, 
    SlideType 
} from "../Slide";

jest.mock("uuid", () => {
    return {
        v4: jest.fn(() => "testId"), 
    };
});

describe("Slide", () => {
    const testPos: Position = {x: 10, y: 10}; 
    const testSize: Size = {w: 50, h: 60};

    const text1: SlideObj = {id: "1", position: testPos, size: testSize, isSelected: false, type: SlideObjType.text, textcontent: "Some letters", font: "Arial", fontsize: 18, fontcolor: "#000000", bgcolor: null};
    const text2: SlideObj = {id: "2", position: testPos, size: testSize, isSelected: false, type: SlideObjType.text, textcontent: "Some letters more", font: "Arial", fontsize: 16, fontcolor: "#000000", bgcolor: "#111111"};
    const img1: SlideObj = {id: "3", position: testPos, size: testSize, isSelected: false, type: SlideObjType.image, url: "lim.img"};
    const img2: SlideObj = {id: "4", position: testPos, size: testSize, isSelected: false, type: SlideObjType.image, url: "hon.img"};


    describe("Create slide", () => {
        it("should return new empty slide", () => {
            expect(createSlide()).toEqual({id: "testId",  background: {type:BgType.color, color: "#ffffff"}, content: [], isSelected: false});
        });
    }); 

    describe("Create base slide object", () => {
        it("should create new base slide element with given size and position", () => {
            expect(createBaseSlideObj(testPos, testSize)).toEqual({id: "testId", position: testPos, size: testSize, isSelected: false});
        });
        it("should create new base slide element with size:{50 50} if given size is negative", () => {
            expect(createBaseSlideObj(testPos, {w: -23, h: -12})).toEqual({id: "testId", position: testPos, size: {w: 50, h: 50}, isSelected: false});
        });
    }); 

    describe("Create text slide object", () => {
        it("should create new text object without text content", () => {
            expect(createTextSlideObj(testPos, testSize)).toEqual({
                id: "testId", 
                position: testPos, 
                size: testSize, 
                isSelected: false, 
                type: SlideObjType.text, 
                textcontent: null, 
                font: "Arial", 
                fontsize: 18, 
                fontcolor: "#000000", 
                bgcolor: null
            });
        });
    }); 

    describe("Create image slide object", () => {
        it("should create new image object with image from url", () => {
            expect(createImgSlideObj(testPos, testSize, "Tree.img")).toEqual({
                id: "testId", 
                position: testPos, 
                size: testSize, 
                isSelected: false, 
                type: SlideObjType.image, 
                url: "Tree.img"
            });
        });
    }); 

    describe("Add slide ojects", () => {
        const slide: SlideType = createSlide();
        it("should add text object on slide", () => {
            expect(addSlideObj(slide, text1)).toEqual({
                id: "testId",  
                background: {type:BgType.color, color: "#ffffff"}, 
                content: [{
                    id: "1", 
                    position: testPos, 
                    size: testSize,
                    type: SlideObjType.text,
                    textcontent: "Some letters", 
                    font: "Arial", 
                    fontsize: 18, 
                    fontcolor: "#000000", 
                    bgcolor: null, 
                    isSelected: false
                } ], 
                isSelected: false
            });
        });
        it("should add image object on slide", () => {
            expect(addSlideObj(slide, img1)).toEqual({
                id: "testId",  
                background: {type:BgType.color, color: "#ffffff"}, 
                content: [{
                    id: "3", 
                    position: testPos, 
                    size: testSize,
                    type: SlideObjType.image,
                    url: "lim.img",
                    isSelected: false
                } ], 
                isSelected: false
            });
        });
    });
    
    describe("Delete objects", () => {
        
        const slide: SlideType = {id: "1", background: {type:BgType.color, color: "#ffffff"}, content: [text1, text2, img1, img2], isSelected: false};
        it("should return slide without changes, if element with given id doesn`t exist or no ids", () => {
            expect(deleteSlideObjs(slide, [])).toEqual({id: "1", background: {type:BgType.color, color: "#ffffff"}, content: [text1, text2, img1, img2], isSelected: false});
            expect(deleteSlideObjs(slide, ["7"])).toEqual({id: "1", background: {type:BgType.color, color: "#ffffff"}, content: [text1, text2, img1, img2], isSelected: false});
        })
        it("should delete 1 element with given id from slide", () => {
            expect(deleteSlideObjs(slide, ["3"])).toEqual({id: "1", background: {type:BgType.color, color: "#ffffff"}, content: [text1, text2, img2], isSelected: false});
        })
        it("should delete all element with given ids from slide", () => {
            expect(deleteSlideObjs(slide, ["1", "2", "4"])).toEqual({id: "1", background: {type:BgType.color, color: "#ffffff"}, content: [img1], isSelected: false});
        })
    });

    describe("Change object position", () => {
        it("should change position to text element", () => {
            expect(changeObjPosition(text1, {x: 100, y: 20})).toEqual({id: "1", position: {x: 100, y: 20}, size: testSize, isSelected: false, type: SlideObjType.text, textcontent: "Some letters", font: "Arial", fontsize: 18, fontcolor: "#000000", bgcolor: null});
        });
        it("should change position to image element", () => {
            expect(changeObjPosition(img1, {x: 10, y: 40})).toEqual({id: "3", position: {x: 10, y: 40}, size: testSize, isSelected: false, type: SlideObjType.image, url: "lim.img"});
        });
    });

    describe("Change object size", () => {
        it("should change size to text element", () => {
            expect(changeObjSize(text2, {w: 45, h: 32})).toEqual({id: "2", position: testPos, size: {w: 45, h: 32}, isSelected: false, type: SlideObjType.text, textcontent: "Some letters more", font: "Arial", fontsize: 16, fontcolor: "#000000", bgcolor: "#111111"});
        });
        it("should change size to image element", () => {
            expect(changeObjSize(img2, {w: 72, h: 90})).toEqual({id: "4", position: testPos, size: {w: 72, h: 90}, isSelected: false, type: SlideObjType.image, url: "hon.img"});
        });
        it("should don`t change size to element if given size is negative", () => {
            expect(changeObjSize(img2, {w: -20, h: 20})).toEqual({id: "4", position: testPos, size: {w: 50, h: 60}, isSelected: false, type: SlideObjType.image, url: "hon.img"});
        });
    });

    describe("Edit text content", () => {
        it("should delete text content from element, if gives empty string", () => {
            expect(editTextContent(text1, "")).toEqual({id: "1", position: testPos, size: testSize, isSelected: false, type: SlideObjType.text, textcontent: "", font: "Arial", fontsize: 18, fontcolor: "#000000", bgcolor: null});
        });
        it("should change text content to given string", () => {
            expect(editTextContent(text1, "Other letters")).toEqual({id: "1", position: testPos, size: testSize, isSelected: false, type: SlideObjType.text, textcontent: "Other letters", font: "Arial", fontsize: 18, fontcolor: "#000000", bgcolor: null});
        });
    });

    describe("Edit text font", () => {
        it("should change text font", () => {
            expect(editTextFont(text1, "Calibri")).toEqual({id: "1", position: testPos, size: testSize, isSelected: false, type: SlideObjType.text, textcontent: "Some letters", font: "Calibri", fontsize: 18, fontcolor: "#000000", bgcolor: null});
        });
    });

    describe("Edit font size", () => {
        it("should change font size", () => {
            expect(editTextFontsize(text1, 20)).toEqual({id: "1", position: testPos, size: testSize, isSelected: false, type: SlideObjType.text, textcontent: "Some letters", font: "Arial", fontsize: 20, fontcolor: "#000000", bgcolor: null});
        });
        it("should don`t change font size if given size smaller 0", () => {
            expect(editTextFontsize(text1, -20)).toEqual({id: "1", position: testPos, size: testSize, isSelected: false, type: SlideObjType.text, textcontent: "Some letters", font: "Arial", fontsize: 18, fontcolor: "#000000", bgcolor: null});
        });
    });

    describe("Edit font color", () => {
        it("should change font color", () => {
            expect(editTextFontcolor(text1, "#fefefe")).toEqual({id: "1", position: testPos, size: testSize, isSelected: false, type: SlideObjType.text, textcontent: "Some letters", font: "Arial", fontsize: 18, fontcolor: "#fefefe", bgcolor: null});
        });
    });

    describe("Edit text background color", () => {
        it("should set text background color, if it is not there", () => {
            expect(editTextBgcolor(text1, "#010001")).toEqual({id: "1", position: testPos, size: testSize, isSelected: false, type: SlideObjType.text, textcontent: "Some letters", font: "Arial", fontsize: 18, fontcolor: "#000000", bgcolor: "#010001"});
        });
        it("should change text background color", () => {
            expect(editTextBgcolor(text2, "#010001")).toEqual({id: "2", position: testPos, size: testSize, isSelected: false, type: SlideObjType.text, textcontent: "Some letters more", font: "Arial", fontsize: 16, fontcolor: "#000000", bgcolor: "#010001"});
        });
        it("should unset text background color, if given null", () => {
            expect(editTextBgcolor(text2, null)).toEqual({id: "2", position: testPos, size: testSize, isSelected: false, type: SlideObjType.text, textcontent: "Some letters more", font: "Arial", fontsize: 16, fontcolor: "#000000", bgcolor: null});
        });
    });

    describe("Change background to image", () => {
        it("should change background акщь one image to another image", () => {
            const slide: SlideType = {id: "1", background: {type: BgType.image, url: "table1.img"}, content: [], isSelected: false};
            expect(changeBackgroundToImage(slide, {type: BgType.image, url: "table2.img"})).toEqual({id: "1", background: {type: BgType.image, url: "table2.img"}, content: [], isSelected: false});
        });
        it("should change background from color to image", () => {
            const slide: SlideType = {id: "1", background: {type: BgType.color, color: "#2343a2"}, content: [], isSelected: false};
            expect(changeBackgroundToImage(slide, {type: BgType.image, url: "table2.img"})).toEqual({id: "1", background: {type: BgType.image, url: "table2.img"}, content: [], isSelected: false});
        });
    });

    describe("Change background to color", () => {
        it("should change one backgraund color to another color", () => {
            const slide: SlideType = {id: "1", background: {type: BgType.color, color: "#2343a2"}, content: [], isSelected: false};
            expect(changeBackgroundToColor(slide, {type: BgType.color, color: "#452312"})).toEqual({id: "1", background: {type: BgType.color, color: "#452312"}, content: [], isSelected: false});
        });
        it("should change backround from image to color", () => {
            const slide: SlideType = {id: "1", background: {type: BgType.image, url: "table2.img"}, content: [], isSelected: false};
            expect(changeBackgroundToColor(slide, {type: BgType.color, color: "#452312"})).toEqual({id: "1", background: {type: BgType.color, color: "#452312"}, content: [], isSelected: false});
        });
    });
});