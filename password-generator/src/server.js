import { generatePassword } from "./services/password.service.js";

console.log(generatePassword(100, ["lower", "upper", "symbols"]));