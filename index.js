//----------------------main--------------------------------//

// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();


const fs = require('fs');
let config;
try
{
    const jsonString = fs.readFileSync('./detail.json')
    config = JSON.parse(jsonString);
} catch (err)
{
    console.log(err)
    return
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () =>
{
    console.log('Ready!');
})


// login to Discord with your app's token
client.login(config.token);