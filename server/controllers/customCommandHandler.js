import customCommands from "../commandPallete/customCommands.js";
import { exec } from "child_process";

export async function handleCustomCommand(command) {
    const lowerCmd = command.toLowerCase().trim();

    // If it's not a custom command, just return false (don’t stop anything)
    if (!customCommands[lowerCmd]) {
        return false;
    }

    const commandsToRun = customCommands[lowerCmd];

    for (const cmd of commandsToRun) {
        if (typeof cmd === "function") {
            await cmd();  // run async functions like Puppeteer scripts
        } else {
            exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    console.error(`❌ Error executing: ${cmd}`, stderr);
                } else {
                    console.log(`✅ Ran: ${cmd}`);
                }
            });
        }
    }

    return true; // signal that a custom command was handled
}

