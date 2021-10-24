const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const db = require('quick.db')

module.exports = {
    name: "warn",
    description: 'Warn a member',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        try {

            if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply("You do not have the required permission to run this command!")
            .then(msg => setTimeout(() => {
                msg.delete()
            }, 5000))
            
            const target = message.mentions.members.first();
            const reason = args.slice(1).join(" ");

            if(!target) return message.channel.send(`💥 **Please mention a user!**`)
            .then(msg => setTimeout(() => {
                msg.delete()
            }, 5000))

            if(message.mentions.users.first().bot) return message.channel.send(`💥 **You cannot warn a bot!**`)
            .then(msg => setTimeout(() => {
                msg.delete()
            }, 5000))

            if(target.id === message.author.id) return message.channel.send("💥 **You cannot warn yourself!**")
            .then(msg => setTimeout(() => {
                msg.delete()
            }, 5000))

            if(target.roles.highest.position >= message.member.roles.highest.position) {
                return message.channel.send(`💥 **You cannot warn this user!**`)
                .then(msg => setTimeout(() => {
                    msg.delete()
                }, 5000))
            };

            if(!reason) return message.channel.send(`💥 **Please provide a reason!** - warn @mention <reason>`)
            .then(msg => setTimeout(() => {
                msg.delete()
            }, 5000))

            let warnnings = db.get(`warnings_${message.guild.id}_user_${target.id}`)


            if(warnnings === null) {
                db.set(`warnings_${message.guild.id}_user_${target.id}`, 1)
                target.send(`You have been warned in **${message.guild.name}** for **${reason}**`)
                await message.channel.send(`You warned **${message.mentions.users.first().username}** for **${reason}**`)
                .then(msg => setTimeout(() => {
                    msg.delete()
                }, 10000))
            } else if(warnnings !== null) {
                db.add(`warnings_${message.guild.id}_user_${target.id}`, 1)
                target.send(`You have been warned in **${message.guild.name}** for **${reason}**`)
                await message.channel.send(`You warned **${message.mentions.users.first().username}** for **${reason}**`)
                .then(msg => setTimeout(() => {
                    msg.delete()
                }, 10000))
            }

            if(warnnings >= 4) {
                target.send(`You have been banned in **${message.guild.name}** for **Accumulations of 5 warnings.**`)
                await message.channel.send(`**${message.mentions.users.first().username}** was banned for **Accumulations of 5 warnings.**`)
                .then(msg => setTimeout(() => {
                    msg.delete()
                }, 10000))
                target.ban({reason: 'The member has accumulated 5 warnings.'})
            } else if(warnnings >= 2) {
                target.send(`You have been kicked in **${message.guild.name}** for **Accumulations of 3 warnings.**`)
                await message.channel.send(`**${message.mentions.users.first().username}** was kicked for **Accumulations of 3 warnings.**`)
                .then(msg => setTimeout(() => {
                    msg.delete()
                }, 10000))
                target.kick()
            }

            


        } catch (err) {
            console.log(err)
        }
    },
};