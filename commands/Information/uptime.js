module.exports = {
    name: 'uptime',
    category: "Information",
    description: 'Returns latency and API ping',
    run: async (client, message, args) => {

        function duration(ms) {
            const sec = Math.floor((ms / 1000) % 60).toString();
            const min = Math.floor((ms / (1000 * 60)) % 60).toString();
            const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
            const day = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
            return `${day.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds.`;
        }

        message.channel.send({
            embed: {
                color: 0x03fc24,
                description: `${duration(client.uptime)}`
            }
        });

    }
}