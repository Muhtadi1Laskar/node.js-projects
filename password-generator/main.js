const types = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    digits: "0123456789",
    symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?/"
};

const getRandomChar = (chars) => chars[Math.floor(Math.random() * chars.length)];

const generatePassword = (len, passwordTypes) => {
    if (len < 4) {
        return "Password must be greater than 4";
    }

    let result = [];

    for (let i = 0; i < passwordTypes.length; i++) {
        const chars = types[passwordTypes[i]] || "";
        if (chars.length === 0) continue;
        result.push(getRandomChar(chars));
    }

    let charPool = "";
    for(let i = 0; i < passwordTypes.length; i++) {
        charPool += types[passwordTypes[i]] || "";
    }

    while (result.length < len) {
        result.push(getRandomChar(charPool));
    }

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result.join("");
}



const selectedTypes = ["upper", "lower", "digits", "symbols"];

console.log(generatePassword(10, selectedTypes));