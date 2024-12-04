const request = require('request');
const useragent = require('useragent');

module.exports = async (req, res) => {
    // Get visitor's IP from the headers (Vercel automatically includes it)
    const ipv4 = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const agent = useragent.parse(req.body.userAgent); // Get device information from frontend
    const device = `${agent.family} on ${agent.os.family}`;

    // Your Discord webhook URL
    const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/YOUR_WEBHOOK_URL"; // Replace with your Discord webhook URL

    // Send data to Discord webhook
    request.post(DISCORD_WEBHOOK_URL, {
        json: {
            content: `New visitor: \n- IP: ${ipv4} \n- Device: ${device}`,
        },
    }, (error, response, body) => {
        if (error) {
            console.error('Error sending to Discord:', error);
            return res.status(500).send('Error sending data to Discord');
        }
        res.status(200).send('Data logged');
    });
};
