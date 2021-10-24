const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");

module.exports = {
    name: "tempmute",
    aliases: ['tmute'],
    description: 'Temporarily mute a guild member',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply('💥 **You don\' have permission for this!**')

        const target = message.mentions.members.first()
        const timer = args[1]
        const reason = args.slice(2).join(' ')
        const muterole = message.guild.roles.cache.find((role) => role.name === "mute");

        if(!target) return message.reply('💥 **Please mention a member!**')
        if(target.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(`💥 **You cannot mute this user!**`)
        }

        if(!timer) return message.reply('💥 **Please mention how many hours!**')

        if(!reason) {
            const reason2 = 'Not Reason'

            if(target.bannable) {
               let embed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`
                ✔ \`${target.user.tag}\` **has been successfully mutted for ${timer} hours!**
                `)
                message.channel.send({embeds: [embed]})
                await target.roles.add(muterole)
                setTimeout(() => {
                    target.roles.remove(muterole).catch(err => console.log())

                    target.send(`You are no longer silent on the \`${message.guild.name} (${message.guild.id})\` server!`)
                }, timer*3600000);
            } else {
                return message.channel.send(`💥 **I couldn't mute the user!**`)
            }
            return;
        }

        if(target.bannable) {
            let embed = new MessageEmbed()
            .setColor('RED')
            .setDescription(`
            ✔ \`${target.user.tag}\` **has been successfully mutted for ${timer} hours!**
            `)
            message.channel.send({embeds: [embed]})
            await target.roles.add(muterole)
            setTimeout(() => {
                target.roles.remove(muterole).catch(err => console.log())
                
                target.send(`You are no longer silent on the \`${message.guild.name} (${message.guild.id})\` server!`)
            }, timer*3600000);
        } else {
            return message.channel.send(`💥 **I couldn't mute the user!**`)
        }
        return
    },
};
