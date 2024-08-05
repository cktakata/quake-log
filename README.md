# Quake Log Parser
## _Software Enginner test_

Quake Log Parser is a simple project to parse Quake Log game entries. It just analyze and scores each player in a match.

- Each player who kills another player scores 1;
- Each player killed by <world> or even killed by himself will loses -1;

## Features

- Check each line for specific entry such as "InitGame", "ClientUserInfoChanged", "killed;
- "InitGame" means a new game will start;
- "ClientUserInfoChanged" means a user is logged in the game;
- "killed" means a user is playing the game also killed some other player;
- Each line found based on the statement above will be parsed using RegEx to get specific values, since it follows a pattern;

## Installation

Since no packages are being used (except the 'fs', 'path' and 'readLine' package built-in in nodejs), any version is doable to run the code.

Install the dependencies.

```sh
cd quake-log
npm i
```

Then start the application using

```sh
npm run start:match

or

npm run start:weapon
```

## License

MIT

**Free Software**
