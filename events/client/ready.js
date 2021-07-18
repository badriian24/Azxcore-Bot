const moment = require('moment');
const chalk = require("chalk")

module.exports = async client => {
    let totalUsers = client.guilds.cache.reduce((users , value) => users + value.memberCount, 0);
    let totalGuilds = client.guilds.cache.size
    let totalChannels = client.channels.cache.size

    console.log(chalk.green`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Active, Commands Loaded!`);
    console.log(chalk.green`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} Logged In!`);
    
    
    client.user.setPresence({ activity: { 
    	name: client.config.activityName,
    	type: client.config.activityType
    }, status: "online" });
}