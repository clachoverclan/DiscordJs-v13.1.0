const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");

module.exports = {
    name: "kick",
    description: 'Kick a member from a guild',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply('💥 **You don\' have a permission for kick a member!**')

        const target = message.mentions.members.first();
        const reason = args.slice(1).join('');
        const mod = message.author.tag;

        if(!target) return message.reply('💥 **Please mention a member!**')
        if(target.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(`💥 **You cannot kick this user!**`)
        }


        if(!reason) {
            const reason2 = 'Not Reason'
        
            if(target.kickable) {
                let embed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`
                ✔ \`${target.user.tag}\` **has been successfully kicked!**
                \n**Reason :** \` ${reason2} \`
                `)
                message.channel.send({embeds: [embed]})
                await target.kick({reason : `${reason2} || Kicked by : ${mod}`})
                //console.log(`${reason2} || Kicked by : ${mod}`)
            } else {
                return message.channel.send(`💥 **I couldn't kick the user!**`)
            }
            return;
        }

        if(target.kickable) {
            let embed = new MessageEmbed()
            .setColor('RED')
            .setDescription(`
            ✔ \`${target.user.tag}\` **has been successfully kicked!**
            \n**Reason :** \` ${reason} \`
            `)
            message.channel.send({embeds: [embed]})
            await target.kick({reason : `${reason} || Kicked by : ${mod}`})
            //console.log(`${reason} || Kicked by : ${mod}`)
        } else {
            return message.channel.send(`💥 **I couldn't kick the user!**`)
        }
        return
    },
};