import { FC, memo, useMemo } from 'react';
import classNames from 'classnames';

import styles from './flexTextEllipsis.module.css';

export interface FlexTextEllipsisProps {
    children: string;
    tailLength: number;
    title?: string;
    className?: string;
}

const FlexTextEllipsisComponent: FC<FlexTextEllipsisProps> = props => {
    const { children, tailLength, title, className } = props;

    const { headText, tailText } = useMemo(() => {
        const splitIndex = children.length - tailLength;
        return {
            headText: children.substring(0, splitIndex),
            tailText: children.substring(splitIndex),
        };
    }, [children, tailLength]);

    const classes = classNames(className, styles.container);

    return (
        <div className={classes} title={title}>
            <div className={styles.innerContainer}>
                <div className={classNames(styles.head, styles.ellipsis)}>
                    {headText}
                </div>
                <div className={classNames(styles.tail, styles.ellipsis)}>
                    {tailText}
                </div>
            </div>
        </div>
    );
};

export const FlexTextEllipsis = memo(FlexTextEllipsisComponent);
