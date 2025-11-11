const PHRASES = [
    'apple', 'brave', 'cloud', 'dragon', 'eagle', 'flame', 'globe', 'heart',
    'ice', 'jewel', 'king', 'light', 'mountain', 'night', 'ocean', 'pearl',
    'queen', 'river', 'star', 'tree', 'unity', 'vortex', 'water', 'xray',
    'year', 'zenith'
];

export const generatePassphrase = (options = {}) => {
    const {
        words = 4,
        seperator = '-',
        capitalize = false,
        addNumber = false
    } = options;

    let passphrase = [];

    for (let i = 0; i < words; i++) {
        let word = PHRASES[Math.floor(Math.random() * PHRASES.length)];

        if (capitalize) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }

        passphrase.push(word);
    }

    if (addNumber) {
        const randomNumber = Math.floor(Math.random() * 100);
        passphrase.push(randomNumber.toString());
    }

    return passphrase.join(seperator);
}