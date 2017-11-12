console.log('[Selfbot] Do not break the Discord TOS or guidelines while using this selfbot.')
console.log('[Selfbot] I am not responsible if you get banned from Discord or any guilds.')
console.log('[Selfbot] If you do not agree with the above, close the console window down now.')
const Discord = require("discord.js")
const chancejs = require("chance");
const dbl = require("dbl.js");
const catFacts = require('cat-facts');
const dogFacts = require('dog-facts');
const hastebin = require('hastebin-gen');
const translate = require('google-translate-api');
const chance = new chancejs();
const bot = new Discord.Client()
const superagent = require("superagent")
const moment = require('moment');
require('moment-duration-format');
var config = require("./config.json")
const prefix = config.prefix

let dblclient = new dbl.Client({
    dbltoken: "",
    id: ""
});

bot.on("ready", () => {
    bot.login(config.token);
    console.log('----------------------------------------------------------')
    console.log('[Selfbot] Connected to Discord via the token successfully.')
    console.log('[Selfbot] Username: ' + bot.user.username)
    console.log('[Selfbot] Running on Discord API version ' + Discord.version)
})

let shortcuts = new Map([
    ['lenny', '( ͡° ͜ʖ ͡°)'],
    ['magic', '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧'],
    ['yay', '( ﾟヮﾟ)'],
    ['smile', '{◕ ◡ ◕}'],
    ['wizard', '(∩´• . •`)⊃━☆ﾟ.*'],
    ['happy', '╰( ◕ ᗜ ◕ )╯'],
    ['party', '(つ°ヮ°)つ'],
    ['dance', '└╏ ･ ᗜ ･ ╏┐'],
    ['disco', '（〜^∇^)〜'],
    ['woahmagic', '(∩｡･ｏ･｡)っ.ﾟ☆`｡'],
    ['rage', '(┛ಠДಠ)┛彡┻━┻'],
    ['excited', '☆*:. o(≧▽≦)o .:*☆'],
    ['music', '(✿ ◕ᗜ◕)━♫.*･｡ﾟ'],
    ['woah', '【 º □ º 】'],
    ['flipparty', '༼ノ◕ヮ◕༽ノ︵┻━┻'],
    ['sad', '(;﹏;)'],
    ['wink', '(^_-)']
])

bot.on("message", msg => {
    if (msg.author.id != config.userid) { return; }
    let cmd = msg.content.split(" ")[0]
    cmd = cmd.slice(prefix.length)
    let args = msg.content.split(" ").slice(1)
    if (cmd === "eval") {
        let res
        try {
            res = eval(args.join(" "))
        } catch (err) {
            return msg.edit("", { embed: new Discord.RichEmbed().setTitle("Results").setColor("#FF0000").setDescription(":desktop: **Input**: ```" + args.join("") + "```:eyes: **Error**: ```" + err + "```").setFooter("Eval") })
        }
        msg.edit("", { embed: new Discord.RichEmbed().setTitle("Results").setColor("#46FF00").setDescription(":desktop: **Input**: ```" + args.join("") + "```:white_check_mark: **Output**: ```" + res + "```").setFooter("Eval") })
    }
    if (cmd === "ping") {
        msg.edit(":ping_pong: Pong! The ping is **" + bot.ping.toFixed() + "**ms")
    }
    if (cmd == "botinfo") {
        let bot = msg.mentions.users.first()
        if (!bot) { return msg.edit(":x: Unknown bot!") }
        dblclient.getBotData(bot.id).then((stats) => {
            msg.edit(("", { embed: new Discord.RichEmbed().setTitle("**DBL Bot Info**").setColor("#00D4FF").setThumbnail("https://images.discordapp.net/avatars/" + stats.clientid + "/" + stats.avatar + ".png?width=80&height=80").setDescription("**Bot Name**\n" + stats.username + "#" + stats.discriminator + "\n**Description**\n" + stats.shortdesc + "\n**Prefix**\n" + stats.prefix + "\n**Library**\n" + stats.lib + "\n**Server Count**\n" + stats.server_count + "\n**Upvotes**\n" + stats.points + "\n**Owner(s)**\n" + stats.owners + "\n").setFooter("Information sourced from Discord Bot List") }));
        }).catch(e => msg.edit(":x: I'm sorry, but I couldn't find the bot data to an error: ```" + e + "```\n"));
    }
    if (cmd === "uptime") {
        msg.edit("The uptime is **" + moment.duration(bot.uptime).format(' D [days], H [hrs], m [mins], s [secs]') + "**")
    }
    if (cmd === "userinfo") {
        let user = msg.mentions.users.first()
        if (!user) { return msg.edit(":x: Unknown user!") }
        msg.edit(("", { embed: new Discord.RichEmbed().setTitle("**Userinfo**").setColor("#00D4FF").setThumbnail(user.avatarURL).setDescription("Username - **" + user.username + "**\nDiscrim - **" + user.discriminator + "**\nID - **" + user.id + "**\nGame - **" + user.presence.game.name + "**\nStatus - **" + user.presence.status + "**\n").setFooter("Information sourced from Discord") }));
    }
    if (cmd === "stats") {
        msg.edit("I am on **" + bot.guilds.size + "** servers with **" + bot.users.size + "** users on them")
    }
    if (cmd === "translate") {
        let translateme = args.slice(0).join(" ")
        translate(translateme, { to: config.translate }).then(res => {
            msg.edit("", { embed: new Discord.RichEmbed().setTitle("Translate").setColor("#00C5FF").setDescription("From - ** " + res.from.language.iso + "**\nTo - ** " + config.translate + "**\nInput - **" + translateme + "**\nOutput :arrow_down:```" + res.text + "```").setFooter("Powered by Google") })
        }).catch(err => {
            msg.edit(":x: An error has occurred. Details: " + err)
        });
    }
    if (cmd === "coinflip") {
        msg.edit("" + chance.pickone(["I flipped a coin and got **heads**!", "I flipped a coin and got **tails**!"]))
    }
    if (cmd === "name") {
        msg.edit("" + chance.name())
    }
    if (cmd === "number") {
        msg.edit("" + chance.integer({ min: 0, max: 10000 }))
    }
    if (cmd == "cat") {
        superagent.get("https://random.cat/meow", (err, res) => {
            if (err) { return msg.edit(":x: An error has occurred. Details: " + err) }
            msg.edit("", {
                embed: new Discord.RichEmbed().setTitle("Random Cat").setColor("#FBFF00").setDescription(catFacts.random()).setImage(res.body.file).setFooter("Image by random.cat")
            })
        })
    }
    if (cmd == "dog") {
        superagent.get("https://random.dog/woof.json", (err, res) => {
            if (err) { return msg.edit(":x: An error has occurred. Details: " + err) }
            msg.edit("", { embed: new Discord.RichEmbed().setTitle("Random Dog").setColor("#FBFF00").setDescription(dogFacts.random()).setImage(res.body.url).setFooter("Image by random.dog") })
        })
    }
    if (cmd == "neko") {
        superagent.get("https://nekos.life/api/neko", (err, res) => {
            if (err) { return msg.channel.send(":x: An error has occurred. Details: " + err) }
            msg.edit("", { embed: new Discord.RichEmbed().setTitle("Random Neko").setColor("#FBFF00").setImage(res.body.neko).setFooter("Image by nekos.life") })
        })
    }
    if (cmd == "lizard") {
        superagent.get("https://nekos.life/api/lizard", (err, res) => {
            if (err) { return msg.edit(":x: An error has occurred. Details: " + err) }
            msg.edit("", { embed: new Discord.RichEmbed().setTitle("Random Lizard").setColor("#FBFF00").setImage(res.body.url).setFooter("Image by nekos.life") })
        })
    }
    if (cmd === "guildlist") {
        msg.edit(bot.guilds.forEach(g => { msg.edit(g.name) }))
    }
    if (cmd === "embed") {
        let embedContent = args.slice(1).join(" ")
        msg.edit("", { embed: new Discord.RichEmbed().setColor("#" + args[0]).setDescription(embedContent) })
    }
    if (cmd == "haste") {
        let haste = args.slice(0).join(" ")
        if (!args[0]) { return msg.edit(":x: What do you want to post to Hastebin?") }
        hastebin(haste).then(r => {
            msg.edit(":white_check_mark: Posted text to Hastebin at this URL: " + r);
        }).catch(msg.edit(":x: An error has occurred. Details: " + console.error));
    }
    if (cmd == "exec") {
        let tok = config.token
        require("child_process").exec(args.join(" "), (err, stdout, stderr) => {
            stdout = stdout.replace(tok, "Sensitive info removed.")
            if (err) return msg.edit("", { embed: new Discord.RichEmbed().setTitle("Results").setColor("#FF0000").setDescription(":desktop: **Input**: ```" + args.join("") + "```:eyes: **An error occured**").setFooter("Exec") })
            msg.edit("", { embed: new Discord.RichEmbed().setTitle("Results").setColor("#46FF00").setDescription(":desktop: **Input**: ```" + args.join("") + "```:white_check_mark: **Output**: ```" + stdout + "```").setFooter("Exec") })
        })
    }
})

bot.on('message', message => {
    if (message.author !== config.userid) return;
    let prefix = config.prefix;
    if (!message.content.startsWith(prefix)) return;

    let command_name = message.content.slice(1);
    if (shortcuts.has(command_name)) {
        setTimeout(() => { message.edit(shortcuts.get(command_name)) }, 50);
        return;
    }
});

bot.on('message', message => {
    if (message.author !== config.userid) return;
    let pruneprefix = config.prefix;
    if (!message.content.startsWith(pruneprefix)) return;
    const params = message.content.split(' ').slice(1);
    if (message.content.startsWith(pruneprefix + 'prune')) {
        let messagecount = parseInt(params[0]);
        message.channel.fetchMessages({
                limit: 100
            })
            .then(messages => {
                let msg_array = messages.array();
                msg_array = msg_array.filter(m => m.author.id === client.user.id);
                msg_array.length = messagecount + 1;
                msg_array.map(m => m.delete().catch(console.error));
            });
    }
});

bot.login(config.token);
