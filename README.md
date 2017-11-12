# Discord-Selfbot
Discord.js selfbot

Requirements Node.js 8

NPM (Comes with node)


Download Node.js from https://nodejs.org/en/download/ and choose "Latest", for linux see below
Run the installer or do "sudo apt-get install nodejs" (Make sure not to install the "legacy" version!)
Download the repo and extract it somewhere you will remember.
Open install.bat, or type in a node.js command prompt "npm install discord.js chance superagent moment moment-duration-format cat-facts dog-facts" (This will take some time)
Open config.json in VS Code, Notepad++ or any text editor that is NOT Notepad or Wordpad
Grab your token by doing ctrl + shift + I on Windows (Idk what it is on other OS) then go to the 3 dots, click application, click local storage, click https://discordapp.com and then copy the token file into the token section of the JSON file. KEEP THE TOKEN PRIVATE, IT GIVES FULL ACCESS TO YOUR ACCOUNT
Go to settings, appearance and enable developer mode
Type something in chat, right click your name and click copy id
Paste your ID into the userid section of the JSON file.
Choose a prefix and type it into the prefix section of the JSON file.
Run start.bat or open a node.js command prompt, go to the directory of the selfbot and run "node selfbot.js"
Have Fun!


Commands


Haste - Posts data to Hastebin

Userinfo - Tells you about the pinged user

Botinfo - Grabs info from discordbots.org about pinged bot

Cat - Gives you a random cat image and fact

Dog - Gives you a random cat image and fact

Lizard - Gives you a random lizard image

Coinflip - Flips a coin

Eval - Runs a JS snippet

Exec - Executes a command on your computer

Stats - Gives you the amount of servers you are on with the usercount

Uptime - Tells you selfbot uptime

Ping - Tells you selfbot ping

Embed - Writes an embed for you (include color code without '#', and the message)

Guildlist - Lists all the guilds you are in

Prune - Prunes chat (Messages that you have sent)
