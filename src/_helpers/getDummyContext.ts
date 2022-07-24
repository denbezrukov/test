let dummyContext: CanvasRenderingContext2D | null = null;

export const getDummyContext = () => {
    if (dummyContext) {
        return dummyContext;
    }
    dummyContext = document.createElement('canvas').getContext('2d');

    return dummyContext;
};
