/* ============================================================
   1. Profanity dictionaries (no external library)
   ============================================================ */

/* English */
const englishWords = [
    'fuck', 'fucker', 'fucking', 'motherfucker', 'fuckface', 'fuckhead',
    'shit', 'bullshit', 'shithead', 'shitface', 'dumbass', 'jackass',
    'asshole', 'asshat', 'asswipe', 'asslicker', 'dipshit',
    'bitch', 'son of a bitch', 'bastard',
    'cunt', 'twat', 'twats', 'pussy', 'dick', 'dickhead', 'dickwad',
    'cock', 'cocksucker', 'prick', 'wanker', 'slut', 'whore', 'hoe',
    'retard', 'retarded', 'moron', 'idiot',
    'jerkoff', 'bugger', 'bollocks', 'bloody hell', 'goddamn', 'hell'
];

/* German */
const germanWords = [
    'scheiße', 'scheisse', 'scheissdreck',
    'arsch', 'arschloch', 'arschgeige', 'arschkriecher', 'arschkind',
    'pisser', 'pissen', 'pissnelke',
    'hure', 'hurensohn', 'hurentochter',
    'wichser', 'wichs', 'wichsfresse',
    'miststück', 'fotze', 'ficker', 'ficken',
    'kacke', 'kackbratze', 'kackwurst',
    'schlampe', 'schwein',
    'drecksau', 'dreckskerl', 'drecksack',
    'verfickt', 'verfickte', 'scheisskerl',
    'idiot', 'vollidiot', 'dummkopf', 'schwachkopf',
    'luder', 'mistkerl', 'blödmann'
];

/* Dutch */
const dutchWords = [
    'kut', 'kuthoer', 'hoer', 'slet', 'trut', 'teef',
    'lul', 'lullo', 'lulletje', 'eikel', 'kloten', 'klotekop',
    'tering', 'teringleijer', 'teringwijf',
    'kanker', 'kankerlijer', 'kankerhoer', 'kankerlul', 'kankerwijf',
    'tyfus', 'tyfushoer', 'tyfuskop',
    'mongool', 'debiel', 'idioot', 'stommerik',
    'rotzak', 'rotkop', 'klootzak', 'zakker',
    'flikker', 'mietje',
    'schoft', 'waardeloze klootzak', 'eikelzak',
    'pleurislijer', 'pleuriswijf'
];

/* Greek */
const greekWords = [
    'μαλάκας', 'μαλακας', 'μαλάκα', 'μαλακα', 'μαλακία', 'μαλακια',
    'πούστης', 'πουστης', 'πουστη', 'πούστη', 'πουτάνα', 'πουτανα',
    'πουτάνες γιε', 'πουτανας γιε',
    'γαμώ', 'γαμω', 'γαμήσι', 'γαμησι', 'γαμημένος', 'γαμημενος',
    'γαμιόλης', 'γαμιολης', 'γαμιολα', 'γαμιόλα',
    'σκατά', 'σκατα', 'σκατό', 'σκατο', 'σκατόφατσα', 'σκατοφατσα',
    'βλάκας', 'βλακας', 'βλάκα', 'βλακα', 'βλακεία', 'βλακεια',
    'καριόλης', 'καριολης', 'καριολα', 'καριόλα', 'καριολακι',
    'μουνί', 'μουνι', 'μουνάκι', 'μουνάρα',
    'ξεκωλιάρα', 'ξεκωλιαρα', 'ξεκωλο', 'ξεκωλο',
    'μπάσταρδος', 'μπασταρδος',
    'κωλόπαιδο', 'κωλοπαιδο',
    'κωλοτρυπίδα', 'κωλοτρυπιδα',
    'ψόφα', 'ψοφα', 'ψόφιος', 'ψοφιος',
    'σκυλί', 'σκυλι', 'σκυλάρα', 'σκυλαρα'
];

/* Merge all */
const wordList = [
    ...englishWords,
    ...germanWords,
    ...dutchWords,
    ...greekWords
];

/* Normalize text for comparison */
function normalize(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')  // remove accents
        .replace(/[^a-zA-Z0-9α-ωΑ-Ωά-ώ]/g, ' '); // keep letters & digits
}

/* ============================================================
   2. Regex-based profanity detection (obfuscation)
   ============================================================ */
const regexProfanity: RegExp[] = [
    // English
    /f[\W_]*u[\W_]*c[\W_]*k/i,
    /s[\W_]*h[\W_]*i[\W_]*t/i,
    /b[\W_]*i[\W_]*t[\W_]*c[\W_]*h/i,
    /a[\W_]*s[\W_]*s[\W_]*h[\W_]*o[\W_]*l[\W_]*e/i,

    // German
    /sch[\W_]*e[\W_]*i[\W_]*ß?e/i,
    /w[\W_]*i[\W_]*c[\W_]*h[\W_]*s[\W_]*e/i,
    /h[\W_]*u[\W_]*r[\W_]*e/i,

    // Dutch
    /k[\W_]*u[\W_]*t/i,
    /h[\W_]*o[\W_]*e[\W_]*r/i,
    /l[\W_]*u[\W_]*l/i,

    // Greek
    /μ[\W_]*α[\W_]*λ[\W_]*α?[\W_]*κ[\W_]*/i,
    /σ[\W_]*κ[\W_]*α[\W_]*τ[\W_]*/i,
    /γ[\W_]*α[\W_]*μ[\W_]*/i
];

/* ============================================================
   3. Injection detection (HTML / JS / SQL / JSON)
   ============================================================ */

const htmlInjectionPatterns: RegExp[] = [
    /<\s*script.*?>/i,
    /<\s*\/script\s*>/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<\s*iframe/i,
    /<\s*img[^>]+on\w+=/i
];

const sqlInjectionPatterns: RegExp[] = [
    /\bUNION\b\s+\bSELECT\b/i,
    /\bDROP\s+TABLE\b/i,
    /\bINSERT\s+INTO\b/i,
    /\bDELETE\s+FROM\b/i,
    /\bUPDATE\s+.*\bSET\b/i,
    /--\s*$/i,
    /;.*$/i
];

const jsonInjectionPatterns: RegExp[] = [
    /\{.*:\s*function\s*\(/i,
    /["']\s*:\s*(\[|\{)/i,
    /\[\s*\d+\s*,/i
];

/* ============================================================
   4. Main checks
   ============================================================ */

export function containsProfanityDictionary(text: string): boolean {
    const normalized = normalize(text);

    return wordList.some(word => normalized.includes(normalize(word)));
}

export function containsProfanityRegex(text: string): boolean {
    return regexProfanity.some((r) => r.test(text));
}

export function containsHtmlInjection(text: string): boolean {
    return htmlInjectionPatterns.some((r) => r.test(text));
}

export function containsSqlInjection(text: string): boolean {
    return sqlInjectionPatterns.some((r) => r.test(text));
}

export function containsJsonInjection(text: string): boolean {
    return jsonInjectionPatterns.some((r) => r.test(text));
}

export function containsUnsafeContent(text: string): boolean {
    return (
        containsProfanityDictionary(text) ||
        containsProfanityRegex(text) ||
        containsHtmlInjection(text) ||
        containsSqlInjection(text) ||
        containsJsonInjection(text)
    );
}

/* Optional: mask profanity only (not injections) */
export function cleanProfanity(text: string): string {
    let cleaned = text;

    // mask dictionary words
    for (const w of wordList) {
        const pattern = new RegExp(w, 'gi');
        cleaned = cleaned.replace(pattern, '****');
    }

    // mask obfuscated forms
    for (const r of regexProfanity) {
        cleaned = cleaned.replace(r, '****');
    }

    return cleaned;
}
