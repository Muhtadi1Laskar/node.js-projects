const PASSWORD_TYPES = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    digits: "0123456789",
    symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?/"
};

const getRandomChar = chars => chars[Math.floor(Math.random() * chars.length)];

export const generatePassword = (len, types) => {
    if (types.length === 0) {
        throw new Error("At least one character type must be selected");
    }

    const result = [];

    for (let i = 0; i < types.length; i++) {
        const char = PASSWORD_TYPES[types[i]] || '';
        if (char.length === 0) continue;
        result.push(getRandomChar(char));
    }

    let charPool = "";
    for (let i = 0; i < types.length; i++) {
        charPool += PASSWORD_TYPES[types[i]] + '';
    }

    while (result.length < len) {
        result.push(getRandomChar(charPool));
    }

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result.join('');
}