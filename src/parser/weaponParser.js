const fs = require('fs');
const path = require('path');
const readline = require('readline');

const logFile = path.resolve(__dirname, '../log/qgames.log');

const matches = [];

async function processWeapon() {
  try {
    const fileStream = fs.createReadStream(logFile);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let total_games = -1;
    for await (const line of rl) {
      let match = {};
      var game;

      if (line.includes('InitGame')) {
        total_games++;
        game = `game-${total_games}`;
        match = {};
        match[game] = {
          kills_by_means: {},
        };
        matches.push(match);
      }

      if (line.includes('killed')) {
        // Parse the line to identify each usable value
        const regexWeapon = /by\s+(.*?)$/;
        const weapon = line.match(regexWeapon)[1];

        if (!matches[total_games][game].kills_by_means[weapon]) {
          matches[total_games][game].kills_by_means[weapon] = 1;
        } else {
          matches[total_games][game].kills_by_means[weapon] = matches[
            total_games
          ][game].kills_by_means[weapon]+=1;
        }

        // Sort by ranking
        matches[total_games][game].kills_by_means = Object.entries(
          matches[total_games][game].kills_by_means
        )
          .sort((a, b) => [b[1]] - a[1])
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
      }
    }

    // Results
    return matches;
  } catch (err) {
    console.log(JSON.stringify(matches, '    ', 2));
    console.error('Error while processing file:', err);
  }
}

module.exports = { processWeapon };
