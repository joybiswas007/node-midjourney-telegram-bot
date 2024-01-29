import dotenv from "dotenv";
dotenv.config();

import TelegramBot from "node-telegram-bot-api";

const { TG_BOT_TOKEN } = process.env;
const bot = new TelegramBot(TG_BOT_TOKEN, { polling: true });

// Import command
import { midJourney } from "./commands/midJourney.js";
import { startBot } from "./commands/start.js";

//Use command
startBot(bot);
midJourney(bot);