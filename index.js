//UPTIMERROBOT
const { get } = require("snekfetch");
const http = require("http");
const express = require("express")
const app = express ()

app.get("/", (req, res) => {
  res.sendStatus(200)
})


app.listen(process.env.PORT)

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
//UPTIMERROBOTEND



//PACKAGE
const Discord = require("discord.js");
const {
	Collection,
	Client,
	Attachment,
	MessageEmbed,
	Intents
} = require('discord.js');
const client = new Client({
	allowedMentions: { parse: ["users", "roles"], repliedUser: true },
	partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
  intents: Intents.ALL,
	restTimeOffset: 10
});
const {
    JsonDatabase
} = require("wio.db");
const afk = require("afk-cord");
const fs = require('fs');
const disbut = require('discord-buttons');
disbut(client)
async function startUp(){



//FILESEND
const wio = new JsonDatabase({
  databasePath:"./database/database.json"
});
const config = require("./configs/config.json");
require("./reply.js");
//FILESEND



//CLIENT
client.commands = new Collection();
client.aliases = new Collection();
client.emotes = require('./configs/emojis.json');
client.config = require('./configs/config.json');
client.prefix = config.prefix;
client.embedcolor = config.embedcolor;
client.footer = config.footer;
client.queue = new Map();
client.vote = new Map();
client.snipes = new Discord.Collection();
client.db = require("wio.db");
//CLIENTEND

["aliases", "commands"].forEach(cmd => client[cmd] = new Discord.Collection());
["console", "command", "event"].forEach(events => require(`./handlers/${events}`)(client));

//HANDLER
client.categories = fs.readdirSync('./commands');
//HANDLEREND



//CONSOLE
client.login(process.env.TOKEN)
}
startUp();

client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
    .on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
    .on("error", (e) => client.logger.log(e, "error"))
    .on("warn", (info) => client.logger.log(info, "warn"));

//For any unhandled errors
process.on("unhandledRejection", (err) => {
  console.error(err);
});
//CONSOLEEND


//CONSOLEEND



