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
        let fitLength: number = originalText.length;
        let prefix = ''; // char from start
        let suffix = ''; // char from end
        let i = 0;
        let j = fitLength - 1;
        let current = middleChars || '...'; // i.e. '...'
        let prev = current;
        while (i < j) {
            prefix += originalText.charAt(i);
            current = prefix + middleChars + suffix;
            if (context.measureText(current).width > maxWidth) {
                fitLength = prev.length;
                break;
            }
            prev = current;
            suffix = originalText.charAt(j) + suffix;
            current = prefix + middleChars + suffix;
            if (context.measureText(current).width > maxWidth) {
                fitLength = prev.length;
                break;
            }
            prev = current;
            i++;
            j--;
        }
        return { charNumber: fitLength };
    }, [maxWidth, tailLength, originalText]);
};
