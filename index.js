//----------------------main--------------------------------//

// requires the discord.js module
const {prefix, token, owner, invite} = require("./config.json");
const {CommandoClient} = require('discord.js-commando');
const path = require('path');


const client = new CommandoClient({
    commandPrefix: prefix,
    owner: owner,
    invite: invite,
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

client.on('error', console.error);


// login to Discord with your app's token
client.login(token);

