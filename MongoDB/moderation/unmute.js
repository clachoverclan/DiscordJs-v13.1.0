const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");

module.exports = {
    name: "unmute",
    description: 'Unmute a member',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply('💥 **You don\' have a permission for this!**')
        const muterole = message.guild.roles.cache.find((role) => role.name === "mute");
        const target = message.mentions.members.first();
        if(!muterole) return message.reply('💥 **There isn\'t has role called "mute"!**')
        if(!target) return message.reply('💥 **Please mention a member!**')
        if(target.roles.highest.position >= message.member.roles.highest.position) return message.reply('💥 **You cannot unmute this user!**')

        target.roles.remove(muterole).catch(err => console.log())
        
        let embed = new MessageEmbed()
        .setColor('ORANGE')
        .setDescription(`
        ✔ \`${target.user.tag}\` **is no longer mute!**
        `)
        message.channel.send({embeds: [embed]})
    },
};