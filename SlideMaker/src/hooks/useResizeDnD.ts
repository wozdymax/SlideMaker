import { useState, useEffect } from 'react';
import { Size } from '../storage/Slide.ts';

const MIN_SIZE = 50;

export const useResizeDnD = (
    objectId: string,
    initialSize: Size,
    position: { x: number, y: number },
    maxSize: Size,
    scale: number,
    onResize: (id: string, newSize: Size) => void
) => {
    const [isResizing, setIsResizing] = useState(false);
    const [startMousePosition, setStartMousePosition] = useState<{ x: number, y: number } | null>(null);
    const [startSize, setStartSize] = useState(initialSize);

    const handleMouseDown = (event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        setIsResizing(true);
        setStartMousePosition({ x: event.clientX, y: event.clientY });
        setStartSize(initialSize);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (isResizing && startMousePosition) {
            const deltaX = event.clientX - startMousePosition.x;
            const deltaY = event.clientY - startMousePosition.y;

            const maxWidth = maxSize.w - position.x;
            const maxHeight = maxSize.h - position.y;

            const newWidth = Math.min(
                Math.max(startSize.w + deltaX / scale, MIN_SIZE),
                maxWidth
            );
            const newHeight = Math.min(
                Math.max(startSize.h + deltaY / scale, MIN_SIZE),
                maxHeight
            );

            onResize(objectId, { w: newWidth, h: newHeight });
        }
    };

    const handleMouseUp = () => {
        setIsResizing(false);
        setStartMousePosition(null);
    };

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    return {
        isResizing,
        handleMouseDown
    };
};
