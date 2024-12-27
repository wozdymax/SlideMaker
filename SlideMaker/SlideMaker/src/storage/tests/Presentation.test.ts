import {createPresentation, renamePresentation, PresentationType } from "../Presentation";

describe("Presentation", () => {
    describe("Create presentation", () => {
        it("should return new empty presentation with name: 'New Presentation'", () => {
            expect(createPresentation()).toEqual({ name: "New Presentation", slides: [] });
        });
    });

    describe("Rename presentation", () => {
        const presentation: PresentationType = createPresentation();
        it("should rename presentation to the given name", () => {
            expect(renamePresentation(presentation, "TestName")).toEqual({name: "TestName", slides: []});
        });

        it("should set 'New Presentation' when name is empty", () => {
            expect(renamePresentation(presentation, "   ")).toEqual({name: "New Presentation", slides: []});
        })
    });
});