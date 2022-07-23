import classNames from 'classnames';
import { FC, memo, useCallback, useMemo, useRef, useState } from 'react';
import { useResizeObserver } from '../_hooks/useResizeObserver';

import styles from './textEllipsis.module.css';

interface TextEllipsisProps {
    children: string;
    tailLength: number;
    title?: string;
    className?: string;
}

interface NodeSize {
    scrollWidth: number;
    clientWidth: number;
}

const initialNodeSize: NodeSize = {
    scrollWidth: 0,
    clientWidth: 0,
};

interface TextEllipsisState {
    containerSize: NodeSize;
    ellipsisSize: NodeSize;
    staticSize: NodeSize;
}

const initialState: TextEllipsisState = {
    containerSize: initialNodeSize,
    ellipsisSize: initialNodeSize,
    staticSize: initialNodeSize,
};

const TextEllipsisComponent: FC<TextEllipsisProps> = props => {
    const { children, tailLength, title, className } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const ellipsisTextRef = useRef<HTMLSpanElement>(null);
    const staticTextRef = useRef<HTMLSpanElement>(null);

    const [state, setState] = useState(initialState);

    const calculateSizes = useCallback(() => {
        const containerNode = containerRef.current;
        const ellipsisNode = ellipsisTextRef.current;
        const staticNode = staticTextRef.current;

        if (ellipsisNode && staticNode && containerNode) {
            setState({
                containerSize: {
                    scrollWidth: containerNode.scrollWidth,
                    clientWidth: containerNode.clientWidth,
                },
                ellipsisSize: {
                    scrollWidth: ellipsisNode.scrollWidth,
                    clientWidth: ellipsisNode.clientWidth,
                },
                staticSize: {
                    scrollWidth: staticNode.scrollWidth,
                    clientWidth: staticNode.clientWidth,
                },
            });
        }
    }, []);

    const targets = useMemo(() => {
        return [containerRef, ellipsisTextRef, staticTextRef];
    }, []);

    useResizeObserver({
        targets,
        onResize: calculateSizes,
    });

    const isStaticTextEllipsis =
        state.containerSize.clientWidth < state.staticSize.scrollWidth;
    const isTitleShown =
        state.ellipsisSize.scrollWidth > state.ellipsisSize.clientWidth ||
        state.staticSize.scrollWidth > state.staticSize.clientWidth;

    const { ellipsisText, staticText } = useMemo(() => {
        const splitIndex = children.length - tailLength;
        return {
            ellipsisText: children.substring(0, splitIndex),
            staticText: children.substring(splitIndex),
        };
    }, [children, tailLength]);

    const classes = classNames(styles.container, className);

    return (
        <div
            className={classes}
            title={isTitleShown ? title ?? children : undefined}
            ref={containerRef}
        >
            <span
                className={classNames(styles.ellipsis, {
                    [styles.hidden]: isStaticTextEllipsis,
                })}
                ref={ellipsisTextRef}
            >
                {ellipsisText}
            </span>
            <span
                className={classNames(styles.static, {
                    [styles.ellipsis]: isStaticTextEllipsis,
                })}
                ref={staticTextRef}
            >
                {staticText}
            </span>
        </div>
    );
};

export const TextEllipsis = memo(TextEllipsisComponent);
