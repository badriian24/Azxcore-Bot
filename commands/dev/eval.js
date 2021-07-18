const Discord = require('discord.js');



module.exports = {
        name: 'eval',
        description: 'Eval',
        aliases: ["ev", "e"],
        usage: '<user>',
        accessableby: "not you",
    execute: async (client, message, args) => {

			let array = [
				"776714971782053889"
				]
  
  if(!array.includes(message.author.id.toString())) {
		return message.channel.send("**biarkan dev nya yang memakai**")
	};


        if (!args[0]) return message.channel.send("**Please Input Code**")
  
        const content = message.content.split(" ").slice(1).join(" ");
        const result = new Promise((resolve, reject) => resolve(eval(content)));
        
        return result.then((output) => {
            if(typeof output !== "string"){
                output = require("util").inspect(output, { depth: 0 });
            }
            if(output.includes(client.token)){
                output = output.replace(message.client.token, "T0K3N");
            }
            message.channel.send(output, {
                code: "js"
            });  
        }).catch((err) => {
            err = err.toString();
            if(err.includes(message.client.token)){
                err = err.replace(message.client.token, "T0K3N");
            }
            message.channel.send(err, {
                code: "js"
            });
        });
      
    }
}