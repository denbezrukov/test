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

    const onMouseEnter = useCallback(() => {
        const headNode = headRef.current;

        if (headNode) {
            setTitleShown(headNode.clientWidth < headNode.scrollWidth);
        }
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
            onMouseEnter={onMouseEnter}
            className={classes}
            title={isTitleShown ? title ?? children : undefined}
        >
            <div className={styles.innerContainer}>
                <div
                    className={classNames(styles.head, styles.ellipsis)}
                    ref={headRef}
                >
                    {headText}
                </div>
                <div className={classNames(styles.tail, styles.ellipsis)}>
                    {tailText}
                </div>
            </div>
        </div>
    );
};

export const TextEllipsis = memo(TextEllipsisComponent);
