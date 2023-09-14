import dotenv from "dotenv";
dotenv.config();

import TelegramBot from "node-telegram-bot-api";

const token = process.env.TG_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Import command
import { midJourney } from "./commands/midJourney.js";

//Use command
midJourney(bot);