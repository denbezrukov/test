import { useState } from 'react';
import { useFitCharacterNumber } from './useFitCharacterNumber';
import { truncateFromMiddle } from './truncateFromMiddle';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import useTextWidth from './useTextWidth';

interface Options {
    originalText: string;
    tailLength: number;
}
const useTruncateFromMiddle = ({ originalText, tailLength }: Options) => {
    const [result, setResult] = useState(originalText || '');
    const contentWidth = 100;
    const textWidth = useTextWidth(originalText);

    const { charNumber } = useFitCharacterNumber({
        originalText,
        maxWidth: contentWidth,
        tailLength,
    });

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
        truncatedText: originalText,
        contentWidth,
        textWidth,
    };
};

export default useTruncateFromMiddle;
