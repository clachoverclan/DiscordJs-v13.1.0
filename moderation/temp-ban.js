const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");

module.exports = {
    name: "tempban",
    aliases: ['tban'],
    description: 'Temporarily ban a guild member',
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
        const mod = message.author.tag;

        if(!target) return message.reply('💥 **Please mention a member!**')
        if(target.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(`💥 **You cannot ban this user!**`)
        }

        if(!timer) return message.reply('💥 **Please mention how many days!**')

        if(!reason) {
            const reason2 = 'Not Reason'

            if(target.bannable) {
               let embed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`
                ✔ \`${target.user.tag}\` **has been successfully banned for ${timer} days!**
                \n**Reason :** \` ${reason2} \`
                `)
                message.channel.send({embeds: [embed]})
                await target.ban({reason: `${reason2} || Time : ${timer} days || Banned by : ${mod}`})
                //console.log(`${reason2} || Time : ${timer} days || Banned by : ${mod}`)
                setTimeout(() => {
                    message.guild.members.unban(target).catch(err => console.log())

                }, timer*86400000);
            } else {
                return message.channel.send(`💥 **I couldn't ban the user!**`)
            }
            return;
        }

        if(target.bannable) {
            let embed = new MessageEmbed()
            .setColor('RED')
            .setDescription(`
            ✔ \`${target.user.tag}\` **has been successfully banned for ${timer} days!**
            \n**Reason :** \` ${reason} \`
            `)
            message.channel.send({embeds: [embed]})
            await target.ban({reason : `${reason} || Time : ${timer} days || Banned by : ${mod}`})
            //console.log(`${reason} || Time : ${timer} days || Banned by : ${mod}`)
            setTimeout(() => {
                message.guild.members.unban(target).catch(err => console.log())
                
            }, timer*86400000);
        } else {
            return message.channel.send(`💥 **I couldn't ban the user!**`)
        }
        return
    },
};