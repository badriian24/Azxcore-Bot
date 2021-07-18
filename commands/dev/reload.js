module.exports = {
        name: 'reload',
        aliases: ['reload'],
        description: 'Reloads the Command.',
    execute: async(client, message, args) => {

        if("776714971782053889" !== message.author.id)  return message.channel.send('Only the Developer can use this command.');

        let cmdfolder = args[0];
        if(!cmdfolder) return message.channel.send('❌ | Provide a command Folder!');

        let command = args[1];
        if(!command) return message.channel.send('❌ | Provide a command!');

        try {
            require(`../${cmdfolder}/${command}`);
        } catch(e) {
            return message.channel.send('❌ | No command with that name found.');
        }

        delete require.cache[require.resolve(`../${cmdfolder}/${command}`)];
        let pull = require(`../${cmdfolder}/${command}`);
        client.commands.set(pull.name, pull);
        console.log(`Reload the Command!`);
        return message.channel.send('✅ Done');
    }
}