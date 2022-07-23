import {useMemo, useState} from 'react';
import { useFitCharacterNumber } from './useFitCharacterNumber';
import { truncateFromMiddle } from './truncateFromMiddle';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import useTextWidth from './useTextWidth';

interface Options {
    originalText: string;
    tailLength: number;
}
const useTruncateFromMiddle = ({ originalText, tailLength }: Options) => {
    const contentWidth = 100;
    const textWidth = useTextWidth(originalText);

    const fitLength = useFitCharacterNumber({
        originalText,
        maxWidth: contentWidth,
        tailLength,
    });

    const truncatedText = useMemo(() => {
        return originalText.substring(0, fitLength) + '...' + originalText.substring(fitLength);
    }, [fitLength, originalText]);

    // useIsomorphicLayoutEffect(() => {
    //     if (elWidth && charNumber && textWidth) {
    //         if (textWidth > elWidth) {
    //             setResult(truncateFromMiddle(originalText, charNumber));
    //         } else {
    //             setResult(originalText);
    //         }
    //     }
    // }, [elWidth, charNumber, textWidth, originalText]);

    return {
        truncatedText,
        contentWidth,
        textWidth,
    };
};

export default useTruncateFromMiddle;
