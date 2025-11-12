import express from 'express'
import cors from 'cors'
import { exec } from 'child_process'
import dotenv from 'dotenv'
import { interpretUserCommand } from './groc.js'
import { handleAppCommand } from './controllers/appCommandHandler.js'
import { handleWebsiteCommand } from './controllers/websiteCommandHandler.js'
import { handleCustomCommand } from './controllers/customCommandHandler.js'

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

// Example: shutdown system (be careful ⚠️)
// app.get("/shutdown", (req, res) => {
//   const { exec } = require("child_process");

//   exec("systemctl poweroff", (err, stdout, stderr) => {
//     if (err) {
//       console.error(stderr);
//       res.status(500).send("❌ Failed to shut down system. Try running as sudo.");
//     } else {
//       res.send("🛑 System is shutting down...");
//     }
//   });
// });

app.get("/testing", (req, res) => {
  exec('xdg-open https://youtube.com', (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      res.status(500).send("❌ Failed to open VScode. Try running as sudo.");
    } else {
      res.send("🛑 System is shutting down...");
    }
  })
})


// ✅ Main route
app.post("/ai-command", async (req, res) => {
  try {
    const { command } = req.body;
    console.log(`🧠 Received Command:`, command);

    // ⚡ Check custom commands first
    // const customResult = handleCustomCommand(command);
    // console.log(customResult)
    // if (customResult) {
    //   // Stop further processing if a custom command was executed
    //   return res.json(customResult);
    // }

    // AI fallback
    const interpreted = await interpretUserCommand(command);
    console.log(`🤖 AI interpreted:`, interpreted);
    if (interpreted.error) return res.json(interpreted);

    const action = interpreted.action?.toLowerCase() || "";
    const target = interpreted.target?.toLowerCase() || "";
    const details = interpreted.details?.toLowerCase() || "";

    let terminalCmd = "";

    // Modular logic
    if (action === "open") terminalCmd = handleAppCommand(target, details);
    else if (action === "run") terminalCmd = handleWebsiteCommand(target);
    else terminalCmd = `echo "Unknown command: ${interpreted.action}"`;

    console.log(`🚀 Executing: ${terminalCmd}`);

    exec(terminalCmd, (err, stdout, stderr) => {
      if (err) console.error("❌ Execution Error:", stderr);
    });
  } catch (err) {
    console.error("🔥 Fatal Error in /ai-command:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});






app.listen(3000, () => {
  console.log("Server running at port 3000");
})