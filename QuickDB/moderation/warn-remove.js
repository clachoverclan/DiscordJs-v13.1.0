const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const db = require('quick.db')

module.exports = {
    name: "warn-remove",
    aliases: ['warn-r'],
    description: 'Remove a warn from a member',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply("You do not have the required permission to run this command!")
        .then(msg => setTimeout(() => {
            msg.delete()
        }, 5000))

        const target = message.mentions.users.first()

        if(!target) return message.channel.send(`💥 **Please mention a user!**`)

        let warnings = db.get(`warnings_${message.guild.id}_user_${target.id}`)

        if(warnings === null) return message.channel.send(`${target} has no warning(s).`)

        db.subtract(`warnings_${message.guild.id}_user_${target.id}`, 1)

        let warnings2 = db.get(`warnings_${message.guild.id}_user_${target.id}`)
        if(warnings2 === null) warnings2 = 0;

        message.channel.send(`${target} now has **${warnings2}** warning(s).`)
    },
};