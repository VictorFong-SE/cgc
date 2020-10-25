const {Command} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');


module.exports = class RAS extends Command
{
    constructor(client)
    {
        super(client,
            {
                name: 'ras_create',
                aliases: ['ras', 'createreactionmessage', 'createras'],
                group: 'role',
                memberName: 'create',
                description: 'Creates a reaction role-minded message, this is the initial creation, not editing.',
                guildOnly: true,
                clientPermissions: ['ADMINISTRATOR'],   //Bot must be admin
                userPermissions: ['MANAGE_CHANNELS'],   //User must be able to edit channels


                args:
                    [
                        {
                            key: 'channel',
                            prompt: 'The ID of the channel in which you want to add the reaction service.\n',
                            type: 'channel',
                            wait: 300,
                        },
                        {
                            key: 'title',
                            prompt: 'The Title message of the fancy block.\n',
                            type: 'string',
                            wait: 300,
                        },
                        {
                            key: 'content',
                            prompt: 'The main message of the fancy block.\n',
                            type: 'string',
                            wait: 300,
                        },
                        {
                            key: 'roleList',
                            prompt: 'the list of all roles to be added.\n',
                            type: 'role',
                            infinite: 'true',
                            wait: 300,
                        },
                    ],
            });
    }

    run = (message, {channel, content, title, roleList}) =>
    {
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(content)
            .setColor(0xaa0b33)
            .addField('\u200b', '\u200b');

        let emojis = [];
        for (const role of roleList)
        {
            const emoji = message.guild.emojis.cache.find(emoji => emoji.name === role.name);
            embed.addField(emoji.toString() + role.name, '\u200b');
            emojis.push(emoji);
        }

        // let embeddedMessage = in case embed is not the proper message after it has been posted
        channel.send(embed).then(sent =>
        {
            for (const emoji of emojis)
            {
                try
                {
                    sent.react(emoji);
                } catch (e)
                {
                    console.error("error: " + e);
                }
            }
        });
    };
};