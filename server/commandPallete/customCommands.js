// customCommands.js

const customCommands = {
  "setup project": [
    "code .", // open VS Code in current directory
    "xdg-open https://github.com", // open GitHub
  ],

  "start work": [
    "discord",
    "spotify", 
  ],

  "launch dev environment": [
    "sudo systemctl start mongod",
    "code ~/Projects/MyAPI",
    "google-chrome http://localhost:3000",
  ],

  "relax time": [
    "spotify",
  ],
  "open stream": [
    'xdg-open https://www.youtube.com/@archon_g'
  ]
};

export default customCommands