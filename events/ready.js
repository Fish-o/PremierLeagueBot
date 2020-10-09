
exports.event = (client) => {
    client.sendinfo('Bot gone online')
	console.log('I am ready to serve you!');
	client.user.setStatus('online');
	client.user.setActivity('idk what to put here');
};


exports.conf = {
    event: "ready"
};