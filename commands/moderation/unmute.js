const { Message } = require('discord.js')

module.exports=  {
    name : 'unmute', 
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
			if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You dont have permission to use this ommand')
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send('**no member**')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        message.channel.send(`${Member.displayName} **has been unmuted**`)
    }
}