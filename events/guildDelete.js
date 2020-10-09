
exports.event = async (client, guild) => {
    client.sendinfo('event: delete guild')
};


exports.conf = {
    event: "guildDelete"
};