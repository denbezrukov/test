import { MutableRefObject } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

type TargetValue<T> = T | undefined | null;

export type Target = MutableRefObject<TargetValue<Element>>;

export interface UseResizeObserverProps {
    targets: Target[];
    onResize: () => void;
}

export const useResizeObserver = (props: UseResizeObserverProps) => {
    const { targets, onResize } = props;

    useIsomorphicLayoutEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            onResize();
        });

        targets.forEach(target => {
            const element = target.current;

            if (element) {
                resizeObserver.observe(element);
            }
        });

        return () => {
            resizeObserver.disconnect();
        };
    }, [onResize, targets]);
};
