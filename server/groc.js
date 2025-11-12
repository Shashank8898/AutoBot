import Groq from "groq-sdk";
import dotenv from 'dotenv'
dotenv.config();;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Convert natural language → structured task instruction
export async function interpretUserCommand(userInput) {
    const prompt = `
You are an AI assistant that converts human language commands into clear JSON instructions
for a backend automation system on Ubuntu. 
Respond ONLY in JSON with this structure:
{
  "action": "<the main action, like 'open', 'close', 'run', 'search'>",
  "target": "<the app, file, or task target>",
  "details": "<extra context if needed>"
}

Example:
User: "Open VS Code and start a new project"
Output:
{
  "action": "open",
  "target": "code",
  "details": "start new project"
}

Now, analyze and convert this:
"${userInput}"
`;

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
    });

    // Extract and parse JSON response
    const raw = completion.choices[0]?.message?.content || "{}";
    try {
        return JSON.parse(raw);
    } catch (e) {
        console.error("Parsing error:", e);
        return { error: "Failed to interpret command", raw };
    }
}
