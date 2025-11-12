// handleCustomCommand.js
import customCommands from '../commandPallete/customCommands.js';
import { exec } from 'child_process';

export function handleCustomCommand(command) {
    const lowerCmd = command.toLowerCase().trim();

    if (!customCommands[lowerCmd]) return null; // not a custom command

    const commandsToRun = customCommands[lowerCmd];
    let executed = 0;

    for (const cmd of commandsToRun) {
        exec(cmd, (err, stdout, stderr) => {
            if (err) console.error(`❌ Error executing: ${cmd}\n`, stderr);
            else console.log(`✅ Ran: ${cmd}`);
        });
        executed++;
    }

    return {
        success: true,
        message: `Executed ${executed} custom command(s) for "${lowerCmd}"`,
    };
}
