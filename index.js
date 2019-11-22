const { Client, RichEmbed } = require("discord.js");
const { config } = require("dotenv")

const client = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
});

client.on("ready", () => {
    console.log(`I'm online, my name is ${client.user.username}`);

    client.user.setPresence({
        status: "online",
        game:   {
            name: "with myself",
            type: "PLAYING"
        }
    });
});

client.on("message" , async message => {
    const prefix = "awo";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd === "ping") {
        const msg = await message.channel.send(`🏓Pinging....`);
        msg.edit(`🏓Pong!\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}\nAPI Latency ${Math.round(client.ping)}ms`);
    }

    if (cmd === "say") {
        if (message.deletable) message.delete();

        if (args.length < 1) return message.reply("Nothing to say?").then(m => m.delete(5000));

        const roleColor = message.guild.me.displayHexColor;

        if (args[0].toLowerCase() === "embeb") {
            const embeb = new RichEmbed()
                .setColor(roleColor)
                .setDescription(args.slice(1).join(" "));

            message.channel.send(embeb);
        }
    }

    console.log(`${message.author.username} said: ${message.content}`);
});

client.login(process.env.TOKEN);
