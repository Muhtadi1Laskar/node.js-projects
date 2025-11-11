import { generatePassphrase } from "./services/passphrase.service.js";
import { generatePassword } from "./services/password.service.js";

let options = {
    words: 10,
    seperator: '-',
    capitalize: false,
    addNumber: true
};

// console.log(generatePassword(100, ["lower", "upper", "symbols"]));

console.log(generatePassphrase(options));