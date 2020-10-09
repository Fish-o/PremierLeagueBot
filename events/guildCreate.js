


exports.event = async (client, guild) => {
    client.sendinfo('event: guild create')
    console.log(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
};


exports.conf = {
    event: "guildCreate"
};