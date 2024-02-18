// Add sudo users who'll have ability to run the bot
import { SUDOER } from "../db/mjSchema.js";

export const listSudoers = (bot, sudoUser) => {
  bot.onText(/\/ls/, async msg => {
    const { id: userId } = msg.from;
    const { id: chatID } = msg.chat;
    const msgId = msg.message_id;
    const options = {
      parse_mode: "HTML",
      reply_to_message_id: msgId
    };
    if (userId !== sudoUser) {
      return bot.sendMessage(
        chatID,
        "Only bot owner can execute this command",
        options
      );
    }

    try {
      const sudoers = await SUDOER.count({});
      if (sudoers > 0) {
        bot.sendMessage(chatID, `Total ${sudoers} users in sudoers.`, options);
      } else {
        bot.sendMessage(chatID, "No user on sudoers yet.", options);
      }
    } catch (error) {
      bot.sendMessage(chatID, `${error.message}`, options);
    }
  });
};