const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");

module.exports = {
    name: "ban",
    description: 'Ban a member from a guild',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply('💥 **You don\' have a permission for ban a member!**')

        const target = message.mentions.members.first();
        const reason = args.slice(1).join('');
        const mod = message.author.tag;

        if(!target) return message.reply('💥 **Please mention a member!**')
        if(target.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(`💥 **You cannot ban this user!**`)
        }


        if(!reason) {
            const reason2 = 'Not Reason'
            
            if(target.bannable) {
                let embed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`
                ✔ \`${target.user.tag}\` **has been successfully banned!**
                \n**Reason :** \` ${reason2} \`
                `)
                message.channel.send({embeds: [embed]})
                await target.ban({reason : `${reason2} || Banned by : ${mod}`})
                //console.log(`${reason2} || Banned by : ${mod}`)
            } else {
                return message.channel.send(`💥 **I couldn't ban the user!**`)
            }
            return;
        }

        if(target.bannable) {
            let embed = new MessageEmbed()
            .setColor('RED')
            .setDescription(`
            ✔ \`${target.user.tag}\` **has been successfully banned!**
            \n**Reason :** \` ${reason} \`
            `)
            message.channel.send({embeds: [embed]})
            await target.ban({reason : `${reason} || Banned by : ${mod}`})
            //console.log(`${reason} || Banned by : ${mod}`)
        } else {
            return message.channel.send(`💥 **I couldn't ban the user!**`)
        }
        return
    },
};