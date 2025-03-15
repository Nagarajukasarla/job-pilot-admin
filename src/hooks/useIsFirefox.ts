export const useIsFirefox = () => {
    return typeof navigator !== 'undefined' && /firefox/i.test(navigator.userAgent);
};