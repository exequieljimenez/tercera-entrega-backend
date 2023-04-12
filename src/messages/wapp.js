import twilio from 'twilio';
import dotenv from 'dotenv'

dotenv.config()

const accountId = process.env.WAPP_ACCOUNT_ID;
const accountToken = process.env.WAPP_ACCOUNT_TOKEN;

const twilioClient = twilio(accountId, accountToken);

const twilioWapp = "whatsapp:+14155238886";
const adminWapp= process.env.ADMIN_WAPP;

export {twilioWapp, adminWapp, twilioClient}