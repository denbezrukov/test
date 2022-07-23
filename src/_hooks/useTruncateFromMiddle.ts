import { useMemo } from 'react';
import { getDummyContext } from '../_helpers/getDummyContext';

interface UseTruncateFromMiddleProps {
    text: string;
    width: number;
    font: string;
}
export const useTruncateFromMiddle = (props: UseTruncateFromMiddleProps) => {
    const { text, width, font } = props;

    return useMemo(() => {
        const context = getDummyContext();
        if (!context) {
            return text;
        }

        const textWidth = context.measureText(text).width;

        if (textWidth <= width) {
            return text;
        }

        const middleChars = '...';

        context.font = font;
        let prefix = '';
        let suffix = '';

        let i = 0;
        let j = text.length - 1;
        let current = middleChars;
        let prev = current;

        while (i < j) {
            prefix += text[i];
            current = prefix + middleChars + suffix;
            if (context.measureText(current).width >= width) {
                return prev;
            }
            prev = current;
            suffix = text[j] + suffix;
            current = prefix + middleChars + suffix;
            if (context.measureText(current).width >= width) {
                return prev;
            }
            prev = current;
            i += 1;
            j -= 1;
        }
        return text;
    }, [width, text, font]);
};
