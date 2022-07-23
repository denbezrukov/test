import { memo, ReactNode, Children, FC, useState, useCallback } from 'react';
import classNames from 'classnames';
import { Point, useDrag } from '../_hooks/useDrag';
import { normalizePercent } from '../_helpers/normalizePercent';

import styles from './table.module.css';

export interface TableProps {
    children: [ReactNode, ReactNode];
}

const TableComponent: FC<TableProps> = props => {
    const { children } = props;

    const totalWidth = 700;
    const [leftPx, setLeft] = useState(totalWidth / 2);
    const [rightPx, setRight] = useState(totalWidth / 2);

    const onDrag = useCallback((delta: Point) => {
        setLeft(prev => prev + delta.x);
        setRight(prev => prev - delta.x);
    }, []);

    const leftFlexBasis = normalizePercent((leftPx / totalWidth) * 100);
    const rightFlexBasis = normalizePercent((rightPx / totalWidth) * 100);

    const { isDragging, onMouseDown } = useDrag(onDrag);

    const [left, right] = Children.toArray(children);

    const classes = classNames(styles.row, {
        [styles.nonUserSelect]: isDragging,
    });

    return (
        <div
            className={classes}
            style={{
                width: totalWidth,
            }}
        >
            <div
                className={styles.column}
                style={{
                    flexBasis: `${leftFlexBasis}%`,
                }}
            >
                {left}
            </div>
            <div className={styles.dragger} onMouseDown={onMouseDown} />
            <div
                className={styles.column}
                style={{
                    flexBasis: `${rightFlexBasis}%`,
                }}
            >
                {right}
            </div>
        </div>
    );
};

export const Table = memo(TableComponent);
