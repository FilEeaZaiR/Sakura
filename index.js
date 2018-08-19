//Base bot discord :
const Discord = require('discord.js');

const client = new Discord.Client();

//Const en plus :
const ytdl = require('ytdl-core');

const queue = new Map();

//Variables :
var servers = {};

var prefix = "s!";

var party_launch = false;

var fs = require('fs');

//Fonctions :
function play(connection, message) {
  
    var server = servers[message.guild.id];
  
    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
  
    server.queue.shift();
  
    server.dispatcher.on("end", function() { 
        if (server.queue[0]) play(connection, message);
  
        else connection.disconnect();
  
    });
}

function game1(){
    client.user.setActivity("Besoin d'aide ? " + prefix + "help");
    setTimeout(game2, 30000);
};

function game2(){
    client.user.setActivity(`Sakura By FilEeaZaiR`);
    setTimeout(game3, 30000);
};

function game3(){
    client.user.setActivity(`${client.guilds.array().length} servers | ${client.users.size} users`);
    setTimeout(game1, 30000);
};

//Login + connexion du bot :
client.login(process.env.TOKEN);

client.on("ready", () => {
    console.log("Connexion en cours ...");
    setTimeout(game1, 30000);
});

//Ajout du bot a un serveur :
client.on("guildCreate", guild => {
    console.log(`un nouveau serveur a été ajouté: ${guild.name} (id: ${guild.id}). Il contient ${guild.memberCount} membres!`);
});

//Début des commandes help :
client.on(`message`, message =>{

//Commande help générale :
    if(message.content === prefix + "help") {
        var aide_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`:robot: Voici mes catégories d'aide !`)
        .setDescription(`Voici mes commandes disponible :`)
        .setThumbnail(message.author.avatarURL)
        .addField(":tools: Modération", "`Fais " + prefix + "mod` pour voir mes commandes de modération !")
        .addField(":tada: Fun", "`Fais " + prefix + "fun` pour voir mes commandes d'animation !")
        .addField(":musical_note: Musique", "`Fais " + prefix + "music` pour voir mes commandes musicales !")
        .setFooter("Menu d'aide - By FilEeaZaiR")
        .setTimestamp()
        message.channel.send(aide_embed);
        console.log(`Un utilisateur viens de faire la commande help !`)
    }

//Commande help Modération :
    if(message.content === prefix + "mod") {
        var mod_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`:tools: Voici mes commandes modérations !`)
        .setThumbnail(message.author.avatarURL)
        .addField(":white_check_mark: " + prefix + "sondage :x:", `Faire un sondage (créer le role "Sondeur") !`)
        .addField(":white_check_mark: " + prefix + "news :x:", `Faire des news (créer le role "News") !`)
        .addField(":1234: " + prefix + "numbergame", "Le bot choisi un nombre, à toi de le deviner !")
        .addField(":hammer: " + prefix + "kick <@user>", "Kick l'utilisateur !")
        .addField(":hammer_pick: " + prefix + "ban <@user>", "Ban l'utilisateur !")
        .addField(":cl: " + prefix + "clear nombre", "Supprime le nombre de messages indiqué")
        .addField(":pause_button: " + prefix + "mute <@user>", "Mute l'utilisateur mentionné")
        .addField(":arrow_forward: " + prefix + "unmute <@user>", "Unmute l'utilisateur mentionné")
        .addField(":warning: " + prefix + "warns <@user>", "warn l'utilisateur mentionné")
        .addField(":warning: " + prefix + "deletewarns <@user>", "enlevé un warn à l'utilisateur mentionné")
        .addField(":warning:  " + prefix + "seewarns <@user>", "voir les warns de l'utilisateur mentionné")
        .setFooter("Commande modération - By FilEeaZaiR")
        .setTimestamp()
        message.channel.send(mod_embed);
    }

//Commands help Fun :
if(message.content === prefix + "fun") {
    var fun_embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`:tada: Voici mes commandes amusantes !`)
    .setThumbnail(message.author.avatarURL)
    .addField(":white_circle: " + prefix + "pileface", "Le bot fait un pile ou face !")
    .addField(":8ball: " + prefix + "8ball", "Pose ta question au bot")
    .addField(":love_letter: " + prefix + "invite", "Tu m'invite ?")
    .addField(":bar_chart: " + prefix + "stats", "voir tes Stats")
    .addField(":information_desk_person: " + prefix + "info", "voir les infos du serveur")
    .setFooter("Commande Fun - By FilEeaZaiR")
    .setTimestamp()
    message.channel.send(fun_embed);
  }

//Commande help Musique :
if(message.content === prefix + "music") {
    var music_embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`:tools: Voici mes commandes modérations !`)
    .setThumbnail(message.author.avatarURL)
    .addField(":musical_note: " + prefix + "play {lien YouTube}", `Mettre une musique en vocal`)
    .addField(":arrow_forward:  " + prefix + "skip", "changer de musique")
    .addField(":x: " + prefix + "leave", "déconnecter le bot")
    .setFooter("Commande musique - By FilEeaZaiR")
    .setTimestamp()
    message.channel.send(music_embed);
  }

});


//Début des commandes modération :
client.on(`message`, message =>{

//Commande de sondage :
if(message.content.startsWith(prefix + "sondage")) {
    if(message.guild.member(message.author).roles.find("name", "Sondeur")){
        let args = message.content.split(" ").slice(1);
        let ThingToEcho = args.join(" ")
        var sondage_embed = new Discord.RichEmbed()
            .setDescription("Sondage")
            .addField(ThingToEcho, "Répondre avec :white_check_mark: ou :x:")
            .setColor("18d67e")
            .setTimestamp()
        message.channel.send(sondage_embed)
        .then(function (message) {
            message.react("✅")
            message.react("❌")
        }).catch(function() {
        });

        message.delete()
    }else{
        return message.channel.send(" désolé, mais tu n'as pas la permission")
    }
}

//Commande de News :
if(message.content.startsWith(prefix + "news")) {
    if(message.guild.member(message.author).roles.find("name", "News")){
        let args = message.content.split(" ").slice(1);
        let ThingToEcho = args.join(" ")
        var news_embed = new Discord.RichEmbed()
            .setDescription("News-Règles")
            .addField("News :", ThingToEcho)
            .setColor("RANDOM")
            .setTimestamp()
        message.channel.send(news_embed)
        message.delete()
    }else{
        return message.channel.send(" désolé, mais tu n'as pas la permission")
    }
}

//Commandes "devine le nombre" :
if(message.content.startsWith(prefix + "numbergame")) {
    if(!message.guild.member(message.author).roles.find("name", "Animateur")) return message.channel.send(`Désolé ${message.author.username}, il faut être Animateur pour faire cette commande.`);
        var numgame_embed = new Discord.RichEmbed()
        .setColor('753951')
        .addField(prefix + "numbergame", "Voir les commandes pour le jeu :tada:")
        .addField(prefix + "start numbergame", "commencer le jeu :video_game:")
        .addField(prefix + "stop numbergame", "finir le jeu :sob:")
        .setFooter("By FilEeaZaiR")
    message.channel.send(numgame_embed)
}

if(message.content.startsWith(prefix + "start numbergame")) {
    if(!message.guild.member(message.author).roles.find("name", "Animateur")) return message.channel.send(`Désolé ${message.author.username}, il faut être Animateur pour faire cette commande.`);
        message.channel.send(`:tada: Une partie viens d'être lancé par ${message.author.username} !`);

        party_launch = true;

        randnum = Math.floor(Math.random() * (2500 - 0) + 0)

        console.log(randnum);
}

if(party_launch && message.content != null){

    if(Number.isInteger(parseInt(message.content))){

        if(message.content > randnum){

            message.channel.send(`désolé ${message.author.username} le nombre est plus petit !`)

        }

        else if(message.content < randnum){

            message.channel.send(`désolé ${message.author.username} le nombre est plus grand !`)

        }

        else{

            message.channel.send(`Bien joué à ${message.author.username}, le nombre était ${randnum}`)
            party_launch = false;

        }

    }
}

if(message.content.startsWith(prefix + "stop numbergame")) {
    if(!message.guild.member(message.author).roles.find("name", "Animateur")) return message.channel.send(`Désolé ${message.author.username}, il faut être Animateur pour faire cette commande.`);
        if(party_launch == true){
            message.channel.send(`:weary: La partie viens d'être arrêté par ${message.author.username} !`)

            party_launch = false;
        }else {
            message.channel.send(`:cry: désolé ${message.author.name} mais aucune partie n'a été lancé !`) 
        }
}

//Commandes Kick, Ban, clear, mute et unmute :
if(message.content.startsWith(prefix + "kick")) {
    if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("`Tu ne peux pas faire cette commande !`");
    
    if(message.mentions.users.size === 0) {
        return message.channel.send(`Je veux bien ${message.author.username} mais vous devez mentionner un utilisateur`)
    }

    var kick = message.guild.member(message.mentions.users.first());
    if(!kick) {
        return message.channel.send("Je ne sais si l'utilisateur existe !")
    }

    if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
        return message.channel.send("Je n'ai pas la perm pour cette commande");
    }

    kick.kick().then(member => {
        message.channel.send(`${member.user.username} a été kick par ${message.author.username}`);
    });
}

if (message.content.startsWith(prefix + "ban")) {
    if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("`Tu ne peux pas faire cette commande !`");
    
    if(message.mentions.users.size === 0) {
        return message.channel.send(`Je veux bien ${message.author.username} mais vous devez mentionner un utilisateur`)
    }

    var ban = message.guild.member(message.mentions.users.first());
    if(!ban) {
        return message.channel.send("Je ne sais si l'utilisateur existe !")
    }

    if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
        return message.channel.send("Je n'ai pas la perm pour cette commande");
    }

    ban.ban().then(member => {
        message.channel.send(`${member.user.username} a été banni par ${message.author.username}`);
    });
}

if(message.content.startsWith(prefix + "clear")) {
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send ("Tu n'as pas la perm ;P");

    let args = message.content.split(" ").slice(1);

    if(!args[0]) return message.channel.send("Précise le nombre de message à supprimer !")
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`${args[0]} messages ont été supprimés !`);
    })

}

if(message.content.startsWith(prefix + "mute")) {
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

    if(message.mentions.users.size === 0) {
        return message.channel.send("Tu dois mentionner quelqu'un pour faire cette commande");
    }

    var mute = message.guild.member(message.mentions.users.first());
    if(!mute) {
        return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
    }

    if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
    message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
        message.channel.send(`${mute.user.username} a été mute par ${message.author.username} !`);
    })
}

if(message.content.startsWith(prefix + "unmute")) {
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

    if(message.mentions.users.size === 0) {
        return message.channel.send("Tu dois mentionner quelqu'un pour faire cette commande");
    }

    var mute = message.guild.member(message.mentions.users.first());
    if(!mute) {
        return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
    }

    if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
    message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
        message.channel.send(`${mute.user.username} a été unmute par ${message.author.username} !`);
    })
}

//Commandes Warns :
let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
 
if (message.content.startsWith(prefix + "warn")){
 
if (message.channel.type === "dm") return;
 
var mentionned = message.mentions.users.first();
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
if(message.mentions.users.size === 0) {
 
    return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
 
}else{
 
    const args = message.content.split(' ').slice(1);
 
    const mentioned = message.mentions.users.first();
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          if (args.slice(1).length != 0) {
 
            const date = new Date().toUTCString();
 
            if (warns[message.guild.id] === undefined)
 
              warns[message.guild.id] = {};
 
            if (warns[message.guild.id][mentioned.id] === undefined)
 
              warns[message.guild.id][mentioned.id] = {};
 
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
 
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
 
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
 
            } else {
 
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
 
                time: date,
 
                user: message.author.id};
 
            }
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
message.delete();
 
            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');
 
message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
}
 
 
 
  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
    const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size !== 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          try {
 
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
              return;
 
            }
 
          } catch (err) {
 
            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
            return;
 
          }
 
          let arr = [];
 
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
 
          for (var warn in warns[message.guild.id][mentioned.id]) {
 
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
 
            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
 
          }
 
          message.channel.send(arr.join('\n'));
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
          console.log(args);
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
 
 
 
 
  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
   const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    const arg2 = Number(args[1]);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
 
          if (!isNaN(arg2)) {
 
            if (warns[message.guild.id][mentioned.id] === undefined) {
 
              message.channel.send(mentioned.tag+" n'a aucun warn");
 
              return;
 
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
 
              message.channel.send("**:x: Ce warn n'existe pas**");
 
              return;
 
            }
 
            delete warns[message.guild.id][mentioned.id][arg2];
 
            var i = 1;
 
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
 
              var val=warns[message.guild.id][mentioned.id][key];
 
              delete warns[message.guild.id][mentioned.id][key];
 
              key = i;
 
              warns[message.guild.id][mentioned.id][key]=val;
 
              i++;
 
            });
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              delete warns[message.guild.id][mentioned.id];
 
            }
 
            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);
 
            return;
 
          } if (args[1] === "tout") {
 
            delete warns[message.guild.id][mentioned.id];
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);
 
            return;
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"deletewarns <utilisateur> <nombre>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"deletewarns <utilisateur> <nombre>");
 
        }
 
      } else {
 
       message.channel.send("Erreur mauvais usage: "+prefix+"deletewarns <utilisateur> <nombre>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
  
if (message.content === prefix + "friend") {
		let user = message.mentions.users.first()
		user.addFriend()
		message.channel.send("Alright, I've added " + user.username + " as Friend.");
	}

if (message.content === prefix + "roleslist") {
		message.channel.send('```\n' + message.guild.roles.map(r => r.name).join('\n') + '```')
	}

});

//Début des commandes fun :
client.on(`message`, message =>{

//Commande d'invitation :
if(message.content === prefix + "invite") {
    var invite_embed = new Discord.RichEmbed()
    .setColor("18d67e")
    .setTitle("Infos sur le serveur")
    .addField("voici mon lien d'invitation", "https://discordapp.com/oauth2/authorize?client_id=460499038870044672&scope=bot&permissions=2146958591")
    .addField("Créer un role", "Le Animateur est a créé pour le jeu numbergame")
    .setFooter("Sakura by FilEeaZaiR")
    message.channel.send(invite_embed)
    console.log("Un membre à utilisé la commande s!invite")
}

//Commande d'information serveur :
if(message.content === prefix + "info") {
    var info_embed = new Discord.RichEmbed()
    .setColor("18d67e")
    .setTitle(`Infos sur le serveur : ${message.guild.name}`)
    .addField("Serveur crée le ", message.guild.createdAt)
    .addField("Tu as rejoins le ", message.member.joinedAt)
    .addField("Nombre de membres", message.guild.members.size)
    .addField("Nombre de salons et de catégories", message.guild.channels.size)
    .setFooter("Sakura by FilEeaZaiR")
    message.channel.send(info_embed)
    console.log("Un membre à utilisé la commande s!info")
}

//Commande pile ou face :
if(message.content.startsWith(prefix + "pileface")) {
    randnum2 = Math.floor(Math.random() * (2 - 0) + 0)

    if(randnum2 === 0){
        message.channel.send("Tu viens d'obtenir un : **Pile** !")
    }else{
        message.channel.send("tu viens d'obtenir un : **Face** !")
    }

    console.log(randnum2);
}

//Commande Stats et ServerList :
if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "stats":

        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()

        .setColor("18d67e")
        .setTitle("Stats")
        .addField(`ID` , msgauthor, true)
        .addField("Date de création du compte :", userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
        .setThumbnail(message.author.avatarURL)
        message.reply("Regarde tes messages privés maintenant.")
        message.author.send(stats_embed);
        break;

        case "serverlist":
        message.channel.send(client.guilds.map(r =>`**${r.name}** | ` + `**${r.memberCount}** membres`))
        break;
    }

//Commande 8ball :
const réponse = JSON.parse(fs.readFileSync('./eightball.json', "utf8"));

    if(message.content.startsWith(prefix + "8ball")) {

        var args = message.content.split(' ').join(' ').slice(7);

        if(!args) return message.channel.send("Tu dois obligatoirement me poser une question !")

        var ball_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('Voici ma commande 8Ball :')
        .addField('Question :', `${args}`)
        .addField('Réponse :', réponse[Math.round(Math.random() * réponse.length)])
        .setFooter('8Ball :)')
        message.channel.send(ball_embed);
    }

//Commande pets :
if(message.content.startsWith(prefix + "pets")) {

    var pets = [

        "https://media.giphy.com/media/3oEduUVL7wX5a1NBXq/giphy.gif",
        "https://media.giphy.com/media/Dcf2hNSaAiLV6/giphy.gif",
        "https://media.giphy.com/media/10ZEx0FoCU2XVm/giphy.gif",
        "https://media.giphy.com/media/vAHZ9rc8rY8zm/giphy.gif",
        "https://media.giphy.com/media/lHsCS3IickU7e/giphy.gif",
        "https://media.giphy.com/media/l0Exk8EUzSLsrErEQ/giphy.gif",
        "https://media.giphy.com/media/1trYyhnI4TGgM/giphy.gif",
        "https://media.giphy.com/media/2ETTlMXeTxfTa/giphy.gif",
        "https://media.giphy.com/media/l0MYRzcWP7cjfNQ2I/giphy.gif",
        "https://media.giphy.com/media/3oKIPCSX4UHmuS41TG/giphy.gif"
    ];

    var gif = pets[Math.floor(Math.random() * pets.length)];

    var pets_embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`:dog: Voici une image d'un animal :cat: :`)
    .setImage(gif)
    .setFooter("Sakura by FilEeaZaiR")
    message.channel.send(pets_embed);

}

});

//Début commandes Musique :
client.on(`message`, message =>{

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {

    case "play":

    if (!args[1]) {

    message.channel.sendMessage(":x: Tu dois m’indiquer un lien YouTube"); 

    return;

  }

    if(!message.member.voiceChannel) {

    message.channel.sendMessage(":x: Tu dois être dans un salon vocal pour écouter la musique !"); 

    return;

  }


    if(!servers[message.guild.id]) servers[message.guild.id] = {

    queue: []

  };


  var server = servers[message.guild.id];


  server.queue.push(args[1]);

  if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {

  play(connection, message) 

  });

  break; 

  case "skip":

    if(!message.member.voiceChannel) {

    message.channel.sendMessage(":x: Tu dois être dans un salon vocal"); 

    return;

  }

    var server = servers[message.guild.id];

    if(server.dispatcher) server.dispatcher.end();
    message.channel.send("Musique en cours de changement ...")

    break;

  case "leave":

    if(!message.member.voiceChannel) 
    
    return message.channel.send(":x: Tu dois être dans un salon vocal");

    message.member.voiceChannel.leave();

    break;
  
}

});

//Début des commandes cachés :
client.on(`message`, message =>{
	var friends = [];
    	var fetched;
    	db.fetch(`${message.author.id}.friendlist`).then(async i => {
        	if(i !== undefined && i !== null)friends = JSON.parse(i);

        	if(friends === [])return message.channel.send("You need some friends before you can use this command. Add some friends by using the command " + prefix + "addfriend (friend).");

        	var embed = new Discord.RichEmbed()
        	.setDescription("```ruby" + "\nFriends Menu \n\nFriends: " + await listFriends(friends) + "```")
        	return message.channel.send(embed);
    	});

   	async function listFriends(array){
        	var result = [];
        	await array.forEach(function(item){
            	result.push(client.users.get(`${item}`).tag);
        	});
        	return result.join("\n");
    	}
	
	var mentioned = message.mentions.members.first();
    	var friends = [];
   	db.fetch(`${message.author.id}.friendlist`).then(i => {


        	if(!mentioned)return message.channel.send("Please mention a valid user to add as your friend.");
        	var user = mentioned.user;

        	if(i !== undefined && i !== null)friends = JSON.parse(i);

        	if(friends.indexOf(user.id) !== -1)return message.channel.send("You have already added this person as your friend.");

        	friends.push(user.id)

        	db.set(`${message.author.id}.friendlist`, JSON.stringify(friends));
        	message.channel.send(`You have successfully added ${user.tag} to your friend list.`)
    	});
}
