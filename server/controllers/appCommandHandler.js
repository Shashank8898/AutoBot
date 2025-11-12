// handleAppCommand.js
import appMap from "../commandPallete/command.js";

/**
 * Handles "open app/file" actions
 * Returns the terminal command to execute
 */
export function handleAppCommand(target) {
    target = target?.toLowerCase() || "";

    if (!target) return "";

    // Check if it's a known installed app
    if (appMap[target]) {
        return appMap[target];
    }

    // Could also add logic to open local files (optional)
    // e.g., terminalCmd = `xdg-open ${filePath}`

    return ""; // empty string if not found
}
