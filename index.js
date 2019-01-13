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
    setInterval(function() {

        var statut = [
          `Reconstruction ...`, 
          `Sakura By FilEeaZaiR`,
          `${client.guilds.array().length} servers | ${client.users.size} users`];
    
        var random = Math.floor(Math.random()*(statut.length));
    
        client.user.setPresence({ 
            game: { 
            name: statut[random],
            type: 0
          }
        });
      }, 30000); 
});

//Ajout du bot a un serveur :
client.on("guildCreate", guild => {
    
console.log(`un nouveau serveur a été ajouté: ${guild.name} (id: ${guild.id}). Il contient ${guild.memberCount} membres!`);
    
  const channel = client.channels.find(c => c.id === "484295699102433307");

    if(!channel) return;

    channel.send({
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
                value: guild.owner.user.username,
                inline: true
            },
            {
                name: `Nombre de personnes sur le serveur :`,
                value: guild.memberCount,
                inline: true
            },
            {
                name: "ID du serveur:",
                value: guild.id,
                inline: true
            }],
            timestamp: new Date(),
            footer: {
                text: `SakuraLog | FilEeaZaiR#1258`,
            }
        }
    });
});

//enlevement du bot a un serveur :
client.on("guildDelete", guild => {
    
console.log(`un serveur a été enlevé: ${guild.name} (id: ${guild.id}). Il contenait ${guild.memberCount} membres!`);
    
  const channel = client.channels.find(c => c.id === "484295699102433307");

    if(!channel) return;

    channel.send({
        embed: {
            color: 0xFE6F01,
            title: "enlevement d'un nouveau serveur :",
            fields: [
            {
                name: "quelqu'un viens d'enlever **Sakura** sur son serveur, nom du serveur:",
                value: guild.name,
                inline: true
            },
            {
                name: "Propriétaire du serveur:",
                value: guild.owner.user.username,
                inline: true
            },
            {
                name: `Nombre de personnes sur le serveur :`,
                value: guild.memberCount,
                inline: true
            },
            {
                name: "ID du serveur:",
                value: guild.id,
                inline: true
            }],
            timestamp: new Date(),
            footer: {
                text: `SakuraLog | FilEeaZaiR#1258`,
            }
        }
    });
});

//Début des commandes help :
client.on(`message`, message =>{

//Commande help générale :
    if(message.content === prefix + "help" || message.content === prefix + "aide") {
    console.log(`Un utilisateur viens de faire la commande help !`)
    message.channel.send({
        embed: {
            color: 0xFE6F01,
            title: ":robot: Voici mes catégories d'aide !",
            description: "Voici mes commandes disponible : (préfix :**" + prefix +"**)" ,
            thumbnail: message.author.displayAvatarURL,
            fields: [
            {
                name: ":tools: Modération",
                value: "`kick`, `mute`, `unmute`, `clear`, `ban`, `warns`, `seewarns`, `deletewarns`",
                inline: true
            },
            {
                name: ":tada: Fun:",
                value: "`pileface`, `8ball`, `serverlist`, `numbergame`, `pets`",
                inline: true
            },
            {
                name: ":information_source: Info",
                value: "`userinfo`, `botinfo`, `serverinfo`, `officialserv`, `invite`, `warns`, `seewarns`, `deletewarns`",
                inline: true
            },],
            timestamp: new Date(),
            footer: {
                text: `SakuraHelp | FilEeaZaiR#1258`,
            }
        }
    });
    }
});
