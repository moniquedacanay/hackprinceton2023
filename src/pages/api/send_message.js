import twilio from 'twilio';
const accountSid = 'AC1cc8792e79baa76c052a8ea1641cb5de';
const authToken = '835d2298a7384b0d81c1f94f68def254';
const client = twilio(accountSid, authToken);
export default async function handler(req, res) {
    const { phoneNumber, message } = req.body;
    const twilioMessage = await client.messages.create({
      body: message,
      from: '+18449164546',
      to: phoneNumber
    });
    console.log(twilioMessage.sid);
    res.status(200).json({ success: true });
  }