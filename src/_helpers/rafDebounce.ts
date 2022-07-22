export function rafDebounce<A extends unknown[]>(notify: (...args: A) => void) {
    let handle: number | undefined;

    const cancel = () => {
        if (handle) {
            window.cancelAnimationFrame(handle);
            handle = undefined;
        }
    };

    return Object.assign(
        (...args: A) => {
            cancel();
            handle = window.requestAnimationFrame(() => notify(...args));
        },
        {
            cancel,
        },
    );
}
