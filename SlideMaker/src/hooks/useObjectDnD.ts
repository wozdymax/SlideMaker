import { useState } from 'react';
import { Position, SlideType } from '../storage/Slide.ts';
import { SelectionObj } from '../storage/EditorType.ts';
import { dispatch } from '../storage/editor.ts';
import { setSelectionObj } from '../storage/Selection.ts';

const SLIDE_WIDTH = 935;
const SLIDE_HEIGHT = 525;

export const useObjectDnD = (
    slide: SlideType,
    scale: number,
    selectionObj: SelectionObj,
    onObjectMove?: (slideObjId: string, newPosition: Position) => void
) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
    const [draggedObjPos, setDraggedObjPos] = useState({ x: 0, y: 0 });

    const onObjClick = (slideObjId: string) => {
        dispatch(setSelectionObj, {
            selectedObjId: slideObjId,
        });
    };

    const handleMouseDown = (e: React.MouseEvent, objId: string) => {
        e.preventDefault();
        const obj = slide.content.find((element) => element.id === objId);
        if (!obj) return;

        setIsDragging(true);
        setDragStartPos({ x: e.clientX, y: e.clientY });
        setDraggedObjPos({ x: obj.position.x, y: obj.position.y });
        onObjClick(objId);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !selectionObj.selectedObjId) return;

        const obj = slide.content.find((element) => element.id === selectionObj.selectedObjId);
        if (!obj) return;

        const changeX = (e.clientX - dragStartPos.x) / scale;
        const changeY = (e.clientY - dragStartPos.y) / scale;

        const newX = Math.max(0, Math.min(SLIDE_WIDTH - obj.size.w, draggedObjPos.x + changeX));
        const newY = Math.max(0, Math.min(SLIDE_HEIGHT - obj.size.h, draggedObjPos.y + changeY));

        onObjectMove?.(selectionObj.selectedObjId, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        onObjClick
    };
};
