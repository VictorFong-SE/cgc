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

    run = async (message, {channel, content, title, roleList}) =>
    {
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(content + '\n')
            .setColor(0xaa0b33);

        let roleSets = new Map();
        for (const role of roleList)
        {
            const emoji = message.guild.emojis.cache.find(emoji => emoji.name === role.name);
            embed.addField(emoji.toString() + role.name, '\u200b');
            roleSets.set(emoji, {emoji: emoji, role: role});
        }

        let embedMessage = await channel.send(embed);

        for (let values of roleSets.values())
        {
            embedMessage.react(values.emoji).catch(console.error);
        }

        //     const filter = (reaction) =>
        //     {
        //         return roleSets.has(reaction.emoji);
        //     }
        //     sent.awaitReactions(filter)
        //         .then((reaction) =>
        //         {
        //             const role = roleSets.get(reaction.emoji).role;
        //             const member = reaction.member;
        //             if (member.roles.cache.has(role))   //remove role
        //             {
        //                 member.roles.remove(role).catch(console.error);
        //             } else // give role
        //             {
        //                 member.roles.add(role).catch(console.error);
        //             }
        //         }).catch(console.error);
        //
        // };
    };
}