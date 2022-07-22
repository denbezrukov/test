let dummyContext: CanvasRenderingContext2D | null = null;

export const getDummyContext = () => {
    if (dummyContext) {
        return dummyContext;
    }
    const fragment = document.createDocumentFragment();
    const canvas = document.createElement('canvas');
    fragment.appendChild(canvas);
    dummyContext = canvas.getContext('2d');

    return dummyContext;
};
