const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");

module.exports = {
    name: "unban",
    description: 'Unban a member from a guild',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply('💥 **You don\'t have permission for this!**')

        const targetId = args[0]

        if(!targetId) return message.reply('💥 **Please mention a member ID**')

        message.guild.members.unban(targetId).catch(err => console.log())
        message.channel.send('✔ **The member has been unban!**')
    },
};