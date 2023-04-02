import twilio from 'twilio';
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
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