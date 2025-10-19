export const isHexString = (str) => {
    const hexRegex = /^[0-9a-fA-F]+$/;
    return hexRegex.test(str);
}