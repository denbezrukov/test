import { useMemo } from 'react';
import { getDummyContext } from '../_helpers/getDummyContext';

export interface Options {
    originalText: string;
    maxWidth: number;
    tailLength: number;
}

export const useFitCharacterNumber = ({
    maxWidth,
    tailLength,
    originalText,
}: Options) => {
    return useMemo(() => {
        const context = getDummyContext()!;
        const middleChars = '...';

        context.font = `18px/18px Arial, sans-serif`;
        let fitLength = originalText.length;
        let prefix = '';
        let suffix = '';

        let i = 0;
        let j = fitLength - 1;
        let current = middleChars;
        let prev = current;

        while (i < j) {
            prefix += originalText.charAt(i);
            current = prefix + middleChars + suffix;
            if (context.measureText(current).width > maxWidth) {
                return prev.length;
            }
            prev = current;
            suffix = originalText.charAt(j) + suffix;
            current = prefix + middleChars + suffix;
            if (context.measureText(current).width > maxWidth) {
                return prev.length;
            }
            prev = current;
            i++;
            j--;
        }
        return fitLength;
    }, [maxWidth, tailLength, originalText]);
};
