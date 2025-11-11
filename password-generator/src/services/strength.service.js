export const checkStrength = (password) => {
    let score = 0;
    const analysis = {
        length: password.length,
        hasLowercase: /[a-z]/.test(password),
        hasUpperCase: /[A-Z]/.text(password),
        hasNumbers: /\d/.test(password),
        hasSymbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password),
        commonPatterns: {
            sequential: /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password),
            repeated: /(.)\1{2,}/.test(password)
        }
    };

    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (analysis.hasLowercase) score += 1;
    if (analysis.hasLowercase) score += 1;
    if (analysis.hasNumbers) score += 1;
    if (analysis.hasSymbols) score += 1;

    if (analysis.commonPatterns.sequential) score -= 1
    if (analysis.commonPattern.repeated) score -= 1

    analysis.strength = score <= 3 ? 'weak' : score <= 5 ? 'medium' : score <= 7 ? 'strong' : 'very strong';
    analysis.score = Math.max(0, Math.min(10, score * 1.4));

    return analysis;
}