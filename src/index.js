const fs = require('fs');
const readline = require('readline');

const matches = [];

// Replace 'your-file.txt' with the actual path to your large file
const logFile = './log/qgames.log';

async function processFile() {
  const fileStream = fs.createReadStream(logFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Detects all line endings
  });

  let total_games = -1;
  for await (const line of rl) {
    let match = {};
    if (line.includes('InitGame')) {
      total_games++;
      match[`game ${total_games}`] = {
        total_kills: 0,
        players: [],
        kills: {},
      };
      matches.push(match);
    }
    if (line.includes('killed')) {
      // Parse the line to identify each usable value
      const regexP1 = /\d{1,3}:\d{1,2} Kill: [^:]+: (.*?) killed/;
      const player1 = line.match(regexP1)[1];
      const regexP2 = /killed (.*?) by/;
      const player2 = line.match(regexP2)[1];
      // Add number of general kills in the game
      matches[total_games][`game ${total_games}`].total_kills++;
      // Add player 1 in the game
      if (player1 !== '<world>') {
        matches[total_games][`game ${total_games}`].players.push(player1);
        if (!matches[total_games][`game ${total_games}`].kills[player1])
          matches[total_games][`game ${total_games}`].kills[player1] = 0;
      }
      // Add player 2 in the game
      matches[total_games][`game ${total_games}`].players.push(player2);
      if (!matches[total_games][`game ${total_games}`].kills[player2])
        matches[total_games][`game ${total_games}`].kills[player2] = 0;

      // Adds player 1 score
      if (player1 !== '<world>' && player1 !== player2) {
        matches[total_games][`game ${total_games}`].kills[player1]++;
      }

      // Removes player score
      if (player1 === '<world>') {
        matches[total_games][`game ${total_games}`].kills[player2]--;
      }

      // Remove duplicated entries
      matches[total_games][`game ${total_games}`].players = [
        ...new Set(matches[total_games][`game ${total_games}`].players),
      ];

    }
  }

  // Results
  console.log(JSON.stringify(matches, '    ', 2));
}

processFile().catch((err) => {
  console.error('Error reading file:', err);
});
