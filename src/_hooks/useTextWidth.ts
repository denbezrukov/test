import { useMemo } from 'react';
import { getDummyContext } from '../_helpers/getDummyContext';

const useTextWidth = (originalText: string) => {
    return useMemo(() => {
        const context = getDummyContext();

        if (context) {
            context.font = `18px/18px Arial, sans-serif`;
            return context.measureText(originalText).width;
        }

        return 0;
    }, [originalText]);
};

export default useTextWidth;
