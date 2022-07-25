import { FC, memo, useCallback, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './textEllipsis.module.css';

export interface TextEllipsisProps {
    children: string;
    tailLength: number;
    title?: string;
    className?: string;
}

const TextEllipsisComponent: FC<TextEllipsisProps> = props => {
    const { children, tailLength, title, className } = props;

    const [isTitleShown, setTitleShown] = useState(false);

    const headRef = useRef<HTMLDivElement>(null);
    const tailRef = useRef<HTMLDivElement>(null);

    const onMouseEnter = useCallback(() => {
        const headNode = headRef.current;
        const tailNode = tailRef.current;

        const isHeadOverflow = headNode
            ? headNode.clientWidth < headNode.scrollWidth
            : false;
        const isTailOverflow = tailNode
            ? tailNode.clientWidth < tailNode.scrollWidth
            : false;

        setTitleShown(isHeadOverflow || isTailOverflow);
    }, []);

    const { headText, tailText } = useMemo(() => {
        const splitIndex = children.length - tailLength;
        return {
            headText: children.substring(0, splitIndex),
            tailText: children.substring(splitIndex),
        };
    }, [children, tailLength]);

    const classes = classNames(className, styles.container);

    return (
        <div
            data-testid="text-ellipsis"
            className={classes}
            title={isTitleShown ? title ?? children : undefined}
            onMouseEnter={onMouseEnter}
        >
            <div className={styles.innerContainer}>
                {headText && (
                    <div
                        data-testid="text-ellipsis-head"
                        className={classNames(styles.head, styles.ellipsis)}
                        ref={headRef}
                    >
                        {headText}
                    </div>
                )}
                {tailText && (
                    <div
                        data-testid="text-ellipsis-tail"
                        className={classNames(styles.tail, styles.ellipsis)}
                        ref={tailRef}
                    >
                        {tailText}
                    </div>
                )}
            </div>
        </div>
    );
};

export const TextEllipsis = memo(TextEllipsisComponent);
