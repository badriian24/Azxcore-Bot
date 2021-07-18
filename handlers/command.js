const { readdirSync } = require('fs');

module.exports = (client) => {
    const load = dirs => {
        const commands = readdirSync(`./commands/${dirs}/`).filter(cmd => cmd.endsWith('.js'));
        for (let cmd of commands) {
            let pull = require(`../commands/${dirs}/${cmd}`);
            client.commands.set(pull.name, pull);
            if (pull.aliases) pull.aliases.forEach(cmd => client.aliases.set(cmd, pull.name));
        };
    };
    ["info", "main", "music", "games", "moderation", "giveaway", "dev"].forEach(cmd => load(cmd));
};