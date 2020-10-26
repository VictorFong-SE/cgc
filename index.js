//----------------------main--------------------------------//

// requires the discord.js module
const {prefix, token, owner, invite, rasChannel} = require("./config.json");
const {CommandoClient} = require('discord.js-commando');
const path = require('path');


const client = new CommandoClient({
    commandPrefix: prefix,
    owner: owner,
    invite: invite,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['fun', 'fun stuff'],
        ['admin', 'administrative'],
        ['role', 'role based'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));


client.once('ready', () =>
{
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('Being responsible');
});

client.on('messageReactionAdd', async (reaction, user) =>
{
    if (reaction.partial)
    {
        try
        {
            await reaction.fetch();
        }catch (error)
        {
            console.error(error);
        }
    }

    let message = reaction.message, emoji = reaction.emoji;
    //TODO
    // let role = message.guild.roles.find(role => role.name === emoji.toString());

    if (user.bot) return;
    if (reaction.message.channel.id === rasChannel)
    {
        await reaction.message.guild.members.cache.get(user.id).roles.add(role);

    }

});

client.on('messageReactionRemove', async (reaction, user) =>
{
    if (reaction.partial)
    {
        try
        {
            await reaction.fetch();
        }catch (error)
        {
            console.error(error);
        }
    }


    let message = reaction.message, emoji = reaction.emoji;
    if (user.bot) return;
    if (reaction.message.channel.id === rasChannel)
    {
        message.guild.roles.cache.find(member =>
        {
            member.removeRole(emoji.name);
        });

    }

});

client.on('error', console.error);




// login to Discord with your app's token
client.login(token);

