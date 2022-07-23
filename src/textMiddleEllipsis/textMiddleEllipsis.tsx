import { FC, memo, useCallback, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { useResizeObserver } from '../_hooks/useResizeObserver';
import { useTruncateFromMiddle } from '../_hooks/useTruncateFromMiddle';
import { useIsomorphicLayoutEffect } from '../_hooks/useIsomorphicLayoutEffect';

import styles from './textMiddleEllipsis.module.css';

interface TextEllipsisProps {
    children: string;
    className?: string;
}

const TextMiddleEllipsisComponent: FC<TextEllipsisProps> = props => {
    const { children, className } = props;
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [font, setFont] = useState('');

    const calculateSizes = useCallback(() => {
        const containerNode = containerRef.current;

        if (containerNode) {
            setWidth(containerNode.clientWidth);
        }
    }, []);

    const targets = useMemo(() => {
        return [containerRef];
    }, []);

    useResizeObserver({
        targets,
        onResize: calculateSizes,
    });

    useIsomorphicLayoutEffect(() => {
        const containerNode = containerRef.current;

        if (containerNode) {
            const computedStyles = window.getComputedStyle(containerNode);
            setFont(`${computedStyles.fontSize} ${computedStyles.fontFamily}`);
        }
    }, []);

    const truncatedText = useTruncateFromMiddle({
        text: children,
        width,
        font,
    });

    const classes = classNames(styles.container, className);

    return (
        <div className={classes} ref={containerRef}>
            {truncatedText}
        </div>
    );
};

export const TextMiddleEllipsis = memo(TextMiddleEllipsisComponent);
