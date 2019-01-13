//Base bot discord :
const Discord = require('discord.js');

const client = new Discord.Client();

//Variables :
var servers = {};

var prefix = "s!";

//Login + connexion du bot :
client.login(process.env.TOKEN);

client.on("ready", () => {
    console.log("Connexion en cours ...");
    client.user.setActivity(`Reconstruction ...`);
});

//Ajout du bot a un serveur :
client.on("guildCreate", guild => {
    
    console.log(`un nouveau serveur a été ajouté: ${guild.name} (id: ${guild.id}). Il contient ${guild.memberCount} membres!`);
    const server = member.guild.channels.find(m => m.id === "484295699102433307");
    if(!server) return;

    server.send({
        embed: {
            color: 0xFE6F01,
            title: "Ajout d'un nouveau serveur :",
            fields: [
            {
                name: "quelqu'un viens d'ajouter **Sakura** sur son serveur, nom du serveur:",
                value: guild.name,
                inline: true
            },
            {
                name: "Propriétaire du serveur:",
                value: guild.owner.id,
                inline: true
            },
            {
                name: `Nombre de personnes sur le serveur :`,
                value: member.guild.memberCount,
                inline: true
            },
            {
                name: "ID du serveur:",
                value: guild.id,
                inline: true
            }],
            timestamp: new Date(),
            footer: {
                text: `ID : ${member.user.id} | FilEeaZaiR#1258`,
            }
        }
    });
});
