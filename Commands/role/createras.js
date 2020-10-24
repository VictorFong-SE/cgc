const {Command, MessageEmbed} = require('discord.js-commando');

module.exports = class RAS extends Command
{
    constructor(client)
    {
        super(client, {
            name: 'ras',
            aliases: ['createreactionmessage', 'createras'],
            group: 'role',
            memberName: 'ras',
            description: 'Creates a reaction role-minded message, this is the initial creation, not editing.',
            guildOnly: true,
            clientPermissions: ['ADMINISTRATOR'],   //Bot must be admin
            userPermissions: ['MANAGE_CHANNELS'],   //User must be able to edit channels


            args:
                [
                    {
                        key: 'channel',
                        prompt: 'The ID of the channel in which you want to add the reaction service.',
                        type: 'integer',
                    },
                    {
                        key: 'title',
                        prompt: 'The Title message of the fancy block.',
                        type: 'string',
                    },
                    {
                        key: 'content',
                        prompt: 'The main message of the fancy block.',
                        type: 'string',
                    },
                    {
                        key: 'roles',
                        prompt: 'the list of all roles to be added.',
                        type: 'string',
                    },
                ],
        });
    }

    run(message, {channel}, {title}, {content}, {roles})
    {
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(content)
            .setColor(0xaa0b33);


        //channel.send(embed);
    }
};