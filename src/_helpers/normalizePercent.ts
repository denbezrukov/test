export const normalizePercent = (percent: number) => {
    return Math.min(100, Math.max(0, percent));
};
