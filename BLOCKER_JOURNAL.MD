# Blocker Journal — Day 1
## Tool: Bull + Redis Queue

### Entry 1
- **Time:** 10:13 AM
- **What I tried:** Installed Redis, ran `redis-server'
- **Error / Blocker:** Could not find the Ubuntu terminal after running wsl --install and restarting the laptop. Typing "ubuntu" in the Start menu only showed a Microsoft Store "Get" button.
- **What I attempted:** Searched the Start menu for the app.
- **Resolution:** Clicked the "Get" button in the Microsoft Store to finish downloading the Ubuntu app, then opened it
- **Time lost:** 15 min


### Entry 2
- **Time:** 10:45 AM
- **What I tried:** Navigating to my Windows project folder (C:\Users\user\Documents\Projects\PLP\Meridian-pivot) from inside the Ubuntu terminal.
- **Error / Blocker:** cd Users failed with No such file or director
- **What I attempted:** Tried cd users and cd Users.
- **Resolution:** Learned that Ubuntu has a completely separate file system. Instead of mixing Windows paths with Linux, I created a new project folder natively inside Ubuntu (/root/meridian-inventory-sync) using mkdir.
- **Time lost:** 20 min

### Entry 3
- **Time:** 11:10 AM
- **What I tried:** Running npm init -y and redis-server inside VS Code.
- **Error / Blocker:** npm : The term 'npm' is not recognized... and redis-server : The term 'redis-server' is not recognized...
- **What I attempted:** Ran the commands in the VS Code integrated terminal.
- **Resolution:** VS Code defaulted to Windows PowerShell instead of the Ubuntu terminal. Since Node and Redis were installed inside Ubuntu, PowerShell couldn't find them. I switched the VS Code terminal profile to "Ubuntu (WSL)" / Bash.
- **Time lost:** 15 min

### Entry 4
- **Time:** 11:30 AM
- **What I tried:** Running node test.js to verify Bull was installed.
- **Error / Blocker:** npm : Error: Cannot find module '/root/meridian-inventory-sync/test.js'
- **What I attempted:** Tried running the script.
- **Resolution:** The test.js file hadn't actually been created in the Ubuntu file system yet. I used the nano test.js command directly in the Ubuntu terminal to create the file, paste the code, save (Ctrl+O, Enter), and exit (Ctrl+X). Running node test.js then returned the successful PONG equivalent message.
- **Time lost:** 10 min

### Entry 5
- **Time:** 12:05 PM
- **What I tried:** Pushing my updated code to GitHub from the Ubuntu terminal.
- **Error / Blocker:** Git asked for my GitHub username and password every single time I tried to push.
- **What I attempted:** Entered my normal GitHub password.
- **Resolution:**  GitHub deprecated standard passwords for terminal pushes. I learned I needed to use a Personal Access Token (PAT). I configured Git to permanently store my credentials using git config --global credential.helper store so I only had to enter the PAT once.
- **Time lost:** 15 min


## Summary
- Total time spent:~1.5 hours
- Was the mini-prototype functional? Yes. Redis stores the queue locally, the producer script successfully pushes 3 jobs to the queue, and the consumer script processes them sequentially. The retry logic successfully handles failing jobs using exponential backoff.
- What I would do differently:  Next time, I will ensure my VS Code default terminal is set to "Ubuntu (WSL)" before starting any development to avoid all cross-platform pathing and command-not-found issues. I will also set up Git credential storage before making my first commit.


