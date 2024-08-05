const { processMatch } = require('./parser/matchParser');
const { processWeapon } = require('./parser/weaponParser');

const args = process.argv.slice(2);
console.log(args[0])
if (args[0] === 'match') {
    (async () => {
        const values = await processMatch();
        console.log(JSON.stringify(values, '    ', 2));
    })();    
} 
if (args[0] === 'weapon') {
    (async () => {
        const values = await processWeapon();
        console.log(JSON.stringify(values, '    ', 2));
    })();    
} 