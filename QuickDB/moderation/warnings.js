const {
    Message,
    Client,
    MessageEmbed,
    Permissions
} = require("discord.js");
const db = require('quick.db')

module.exports = {
    name: "warnings",
    description: 'Show all warn of a member',
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
        .then(msg => setTimeout(() => {
            msg.delete()
        }, 5000))

        let warnings = db.get(`warnings_${message.guild.id}_user_${target.id}`)

        if(warnings === null) warnings = 0;

        message.channel.send(`${target} have **${warnings}** warning(s)`)
    },
};