# 🚀 AutoBot

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green?logo=node.js\&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Shashank8898/AutoBot?style=social)](https://github.com/Shashank8898/AutoBot/stargazers)

**AutoBot** is an AI-powered automation system for Ubuntu, designed to execute commands, open apps, websites, and custom workflows using natural language. Think of it as your personal AI assistant that runs things on your machine exactly the way you describe them.

---

## 🎯 Features

* **Natural Language AI Commands** – Convert human language into executable commands.
* **Open Apps, Files, and Websites** – Launch applications, local files, or URLs automatically.
* **Run Terminal Commands** – Execute shell scripts or custom commands seamlessly.
* **Custom Multi-Step Commands** – Trigger workflows with a simple phrase.
* **Safe Fallbacks** – Open web versions or Google searches if apps fail.
* **Modular & Extendable** – Separate handlers for apps, websites, scripts, and custom commands.

---

## 📸 Screenshots

> Example usage of AutoBot (CLI + browser automation)

![AutoBot in action](https://user-images.githubusercontent.com/your-username/screenshot.png)

---

## 🛠️ Installation

### **Prerequisites**

* Ubuntu / Linux environment
* Node.js v18+
* NPM or Yarn

### **Clone the Repository**

```bash
git clone https://github.com/Shashank8898/AutoBot.git
cd AutoBot/server
```

### **Install Dependencies**

```bash
npm install
```

### **Configure Environment Variables**

Create a `.env` file in the `server` directory:

```env
GROQ_API_KEY=your_groq_api_key_here
```

> ⚠️ Important: **Never commit your `.env` file**. Add it to `.gitignore`.

---

## ⚡ Usage

### **Start the Server**

```bash
node server.js
```

The server runs at `http://localhost:3000`.

---

### **Send AI Commands**

POST to `/ai-command` with JSON body:

```json
{
  "command": "Open VS Code and YouTube in Chrome"
}
```

Response:

```json
{
  "success": true,
  "output": "✅ Command executed successfully"
}
```

---

### **Custom Commands**

Define custom workflows in `commandPallete/customCommands.js`:

```js
export const customCommands = {
  "morning setup": [
    "xdg-open https://mail.google.com",
    "code ~/projects",
    "xdg-open ~/Documents/todo.txt"
  ],
  "workout prep": [
    "xdg-open https://youtube.com/playlist?list=WORKOUT_ID",
    "notify-send 'Workout started!'"
  ]
};
```

Trigger:

```json
{
  "command": "morning setup"
}
```

---

### **Modular Command Handlers**

* **Apps / Files:** `handleAppCommand.js`
* **Websites / URLs:** `handleWebsiteCommand.js`
* **Custom Commands:** `customCommands.js`
* **Execution & Fallbacks:** `executeCommand.js`

> You can extend each handler independently.

---

## 🧠 AI Command Examples

| User Command             | AI Output JSON                                                               |
| ------------------------ | ---------------------------------------------------------------------------- |
| Open VS Code             | `{ "action": "open", "target": "code", "details": "" }`                      |
| Open YouTube in Chrome   | `{ "action": "open", "target": "youtube.com", "details": "browser:chrome" }` |
| Run backup script        | `{ "action": "run", "target": "~/scripts/backup.sh", "details": "" }`        |
| Search Node.js tutorials | `{ "action": "search", "target": "Node.js tutorials", "details": "" }`       |
| Custom morning setup     | `{ "action": "custom", "target": "morning setup", "details": "" }`           |
| Shutdown the system      | `{ "action": "system", "target": "shutdown", "details": "" }`                |

---

## 🔒 Security Notes

* **Never commit secrets** (API keys, passwords, etc.) to GitHub.
* Use `.env` for environment variables.
* GitHub push protection will block commits containing secrets.

---

## 🧩 Project Structure

```
AutoBot/
│
├── server/
│   ├── command.js             # Maps known apps to terminal commands
│   ├── siteMap.js             # Maps known websites
│   ├── customCommands.js      # User-defined custom commands
│   ├── handleAppCommand.js    # App/file handler
│   ├── handleWebsiteCommand.js # Website handler
│   ├── executeCommand.js      # Executes terminal commands with fallbacks
│   ├── groc.js                # AI command interpreter
│   └── server.js              # Main Express server
│
└── README.md
```

---

## 🔮 Future Improvements

* Multi-command sequences in a single AI request
* Task scheduling and recurring automation
* Desktop notifications for executed commands
* Integration with more AI models for advanced automation
* Web dashboard for remote command execution

---

## 📜 License

MIT License © Shashank Tiwari
