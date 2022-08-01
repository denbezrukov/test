import { FC, memo, useMemo, useRef, useState } from 'react';
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

    const hiddenTextRef = useRef<HTMLDivElement>(null);
    const innerContainerRef = useRef<HTMLDivElement>(null);

    const onMouseEnter = () => {
        const hiddenTextNode = hiddenTextRef.current;
        const innerContainerNode = innerContainerRef.current;

        if (hiddenTextNode && innerContainerNode) {
            setTitleShown(
                hiddenTextNode.scrollWidth > innerContainerNode.clientWidth,
            );
        }
    };

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
            <div
                data-testid="text-ellipsis-inner"
                ref={innerContainerRef}
                className={styles.innerContainer}
                data-head={headText}
                data-tail={tailText}
            >
                <div ref={hiddenTextRef} className={styles.hiddenText}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export const TextEllipsis = memo(TextEllipsisComponent);
