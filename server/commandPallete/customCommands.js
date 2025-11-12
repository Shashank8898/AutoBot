import { openLatestLivestream } from "../controllers/customOperations/openLatestLivestream.js";

// customCommands.js
const customCommands = {
  "setup project": [
    () => exec("code ."),
    () => exec("xdg-open https://github.com"),
  ],

  "start work": [
    () => exec("discord"),
    () => exec("spotify"),
  ],

  "launch dev environment": [
    () => exec("sudo systemctl start mongod"),
    () => exec("code ~/Projects/MyAPI"),
    () => exec("google-chrome http://localhost:3000"),
  ],

  "relax time": [
    () => exec("spotify"),
  ],

  "open stream": [
    openLatestLivestream  // 🎯 directly call the imported function
  ]
};


export default customCommands