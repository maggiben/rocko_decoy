# WARNING THIS CODE CONTAINS MALWARE DESIGNED TO STEAL YOUR CREDENTIALS.
The purpose of having this repo online is for security researches to do analysis.
DO NOT DOWNLOAD OR RUN THIS CODE, IM NOT THE OWNER AND IM NOT RESPONSIBLE FOR ITS MISSUSE

THE MALICIOUS PAYLOAD CAN BE FOUND IN `client/postcss.config.js` scroll all the way to the left to see it.

Gpt Analysis:

Key Observations:
Obfuscation via Encoded Strings

Many strings are encoded in Base64 and are decoded at runtime.
It uses a function P() to decode certain parts dynamically.
A function a6() is used to XOR-decode parts of the script.
File System (fs) and OS Interactions

The script requires fs (filesystem) and os modules.
It checks home directory, user info, and system details.
It tries to read and write files in hidden directories.
Potential Network Communication

It constructs URLs dynamically.
It uses require(P('zcGF0aA')), which is path in Base64.
rq=require(P(aR(0xbf)+'A')) suggests that it loads the request module, used for HTTP requests.
Execution of External Commands

Uses child process execution (ex=require(P(aR(0xc0)+'HJvY2Vzcw')) → child_process.exec).
Runs OS commands, potentially for persistence or further actions.
Possible Persistence Mechanism

The function ae() attempts to create directories and write files.
The function am() executes something and then cleans up.
Repeated Execution with Intervals

The script has a setInterval function (aC=setInterval(...)), meaning it keeps executing after specific time intervals.
🚨 Possible Malicious Intent:
Creates files and directories dynamically.
Reads system information, including hostname, home directory, platform, and user info.
Executes shell commands (child_process.exec).
Sends network requests, possibly to a remote server.
Has an encoded or encrypted payload, suggesting it may download and execute additional code.


## Dev Environment Setup (Mac)

- Install VSCode  (https://code.visualstudio.com/)
- Install VSCode Extensions:
    - ESlint 
    - Prettier
- Configure git repo access (https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh)
- Install homebrew (https://brew.sh/)
- Install node `brew install node`
- Install yarn `npm install -g yarn`
- Optonal: 
    - Install asdf version manager `brew install asdf`
    - Install asdf nodejs plugin `asdf plugin add nodejs`
    - Install nodejs 18.19.0 `asdf install nodejs 18.19.0`
    - Install oh my zsh `https://ohmyz.sh/`

## Dev Environment Setup (Windows)

- Install VSCode  (https://code.visualstudio.com/)
- Install VSCode Extensions:
    - ESlint 
    - Prettier
- Install node.js v18.18.0
- Install yarn `npm install -g yarn`
- Project Install: 
    - Install client 'cd client ; yarn install'
    - Run client 'yarn dev'
    - Install server 'cd server ; yarn install'
    - Run server 'yarn dev'
