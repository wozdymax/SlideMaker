import { jsPDF } from "jspdf";
import { BgType, SlideObjType } from "../Slide";
import { PresentationType } from "../Presentation";

const SLIDE_WIDTH = 935;
const SLIDE_HEIGHT = 525;

export const generatePDF = (presentation: PresentationType) => {
    const name = presentation.name;
    const slides = presentation.slides;
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [SLIDE_WIDTH, SLIDE_HEIGHT],
    });

    slides.forEach((slide, index) => {
        if (index > 0) {
            doc.addPage([SLIDE_WIDTH, SLIDE_HEIGHT], "landscape");
        }

        if (slide.background.type === BgType.color) {
            doc.setFillColor(slide.background.color);
            doc.rect(0, 0, SLIDE_WIDTH, SLIDE_HEIGHT, "F");
        } else if (slide.background.type === BgType.image) {
            doc.addImage(slide.background.url, "JPEG", 0, 0, SLIDE_WIDTH, SLIDE_HEIGHT);
        }

        slide.content.forEach((obj) => {
            if (obj.type === SlideObjType.text) {
                doc.setFont(obj.font);
                doc.setFontSize(obj.fontsize);
                doc.setTextColor(obj.fontcolor);
                doc.text(obj.textcontent!, obj.position.x, obj.position.y);
            } else if (obj.type === SlideObjType.image) {
                doc.addImage(obj.url, "PNG", obj.position.x, obj.position.y, obj.size.w, obj.size.h);
            }
        });
    });

    doc.save(`${name}.pdf`);
};
