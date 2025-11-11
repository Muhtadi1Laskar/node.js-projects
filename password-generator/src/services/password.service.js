const PASSWORD_TYPES = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    digits: "0123456789",
    symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?/"
};

const getRandomChar = chars => chars[Math.floor(Math.random() * chars.length)];