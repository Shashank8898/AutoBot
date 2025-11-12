// handleWebsiteCommand.js
import siteMap from '../commandPallete/siteMap.js'

/**
 * Pick the safest browser
 */
const getBrowser = (details = "") => {
    if (details.includes("chrome")) return "google-chrome";
    if (details.includes("firefox")) return "firefox";
    if (details.includes("brave")) return "brave-browser";
    return "xdg-open"; // fallback
};

/**
 * Handles "open website" actions
 * Returns the terminal command to execute
 */
export function handleWebsiteCommand(target, details = "") {
    target = target?.toLowerCase() || "";
    details = details?.toLowerCase() || "";

    if (!target) return "";

    // Check if it's a known website
    if (siteMap[target]) {
        return `${getBrowser(details)} ${siteMap[target]}`;
    }

    // Fallback — Try to open URL or Google Search
    const isURL =
        target.startsWith("http") ||
        target.includes(".com") ||
        target.includes(".org") ||
        target.includes(".io");

    const fallbackURL = isURL
        ? target
        : `https://www.google.com/search?q=${encodeURIComponent(target)}`;

    return `${getBrowser(details)} "${fallbackURL}"`;
}
