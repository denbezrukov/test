import {
    useCallback,
    useRef,
    useState,
    MouseEvent as ReactMouseEvent,
} from 'react';
import { rafDebounce } from '../_helpers/rafDebounce';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export interface Point {
    x: number;
    y: number;
}

export interface IUseDragCurrentHandlers {
    handleMouseMove: (event: MouseEvent) => void;
    handleMouseUp: (event: MouseEvent) => void;
}

export const useDrag = (onDrag: (delta: Point) => void) => {
    const onDragRef = useRef(onDrag);
    onDragRef.current = onDrag;

    const [isDragging, setIsDragging] = useState(false);

    const currentHandlers = useRef<IUseDragCurrentHandlers | undefined>(
        undefined,
    );

    const onMouseDown = useCallback(
        (mouseDownEvent: ReactMouseEvent) => {
            setIsDragging(true);

            let point = {
                x: mouseDownEvent.pageX,
                y: mouseDownEvent.pageY,
            };

            const handleMouseMove = rafDebounce(
                (mouseMoveEvent: MouseEvent) => {
                    const nextPoint = {
                        x: mouseMoveEvent.pageX,
                        y: mouseMoveEvent.pageY,
                    };

                    const delta = {
                        x: nextPoint.x - point.x,
                        y: nextPoint.y - point.y,
                    };

                    point = nextPoint;

                    if (delta.x !== 0 || delta.y !== 0) {
                        onDragRef.current?.(delta);
                    }
                },
            );

            const handleMouseUp = () => {
                setIsDragging(false);

                handleMouseMove.cancel();
                document.removeEventListener('mousemove', handleMouseMove);

                currentHandlers.current = undefined;
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp, {
                once: true,
            });

            currentHandlers.current = {
                handleMouseMove,
                handleMouseUp,
            };
        },
        [setIsDragging, onDragRef, currentHandlers],
    );

    useIsomorphicLayoutEffect(() => {
        return () => {
            const handlers = currentHandlers.current;
            if (handlers) {
                document.removeEventListener(
                    'mousemove',
                    handlers.handleMouseMove,
                );
                document.removeEventListener('mouseup', handlers.handleMouseUp);
            }
        };
    }, [currentHandlers]);

    return {
        isDragging,
        onMouseDown,
    };
};
