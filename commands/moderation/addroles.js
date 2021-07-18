const { Message } = require('discord.js')

module.exports = {
    name : 'addrole',
    aliases: ["addroles"],
    execute : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('**You do not have permission.**')
				if (!message.guild.me.hasPermission("MANAGE_ROLES"))
        return message.channel.send(
          "**I Dont Have The Permissions To Ban Users! - [MANAGE_ROLES]**"
        );
        const target = message.mentions.members.first() 
        if(!target) return message.channel.send('**No member specified**') 
        const role = message.mentions.roles.first() 
        if(!role) return message.channel.send('**No role specified**') 
        await target.roles.add(role) 
        message.channel.send(`${target.user.username} **has obtained a role**`)
    }
}