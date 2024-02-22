import dotenv from "dotenv";

import TelegramBot from "node-telegram-bot-api";

// Import command
import { startBot } from "./bot/commands/start.js";
import { midJourney } from "./bot/commands/midJourney.js";
import { addSudoer } from "./bot/commands/addSudoer.js";
import { removeSudoer } from "./bot/commands/removeSudoer.js";
import { listSudoers } from "./bot/commands/listSudoers.js";

dotenv.config();

const { TG_BOT_TOKEN, SUDO_USER } = process.env;
const sudoUser = parseInt(SUDO_USER, 10);

const bot = new TelegramBot(TG_BOT_TOKEN, { polling: true });

// Use command
startBot(bot);
midJourney(bot, sudoUser);
addSudoer(bot, sudoUser);
removeSudoer(bot, sudoUser);
listSudoers(bot, sudoUser);
