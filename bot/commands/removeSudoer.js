// Add sudo users who'll have ability to run the bot
import { SUDOER } from "../db/mjSchema.js";

export const removeSudoer = (bot, sudoUser) => {
  bot.onText(/\/rm/, async (msg, match) => {
    const { id: userId } = msg.from;
    const { id: chatID } = msg.chat;
    const msgId = msg.message_id;
    const options = {
      parse_mode: "HTML",
      reply_to_message_id: msgId
    };
    // User id that is going to be added as sudo
    const sudoId = msg.text.replace(match[0], "").trim();
    if (sudoId.length === 0) {
      return bot.sendMessage(chatID, "User id can't be empty.", options);
    }
    if (userId !== sudoUser) {
      return bot.sendMessage(
        chatID,
        "Only bot owner can execute this command",
        options
      );
    }

    try {
      const rmsu = await SUDOER.findOneAndDelete({ sudoer: sudoId });
      if (rmsu) {
        bot.sendMessage(
          chatID,
          "User has been removed from sudoers. They won't be able to use the bot now unless given permission again.",
          options
        );
      } else {
        bot.sendMessage(
          chatID,
          "User was not found in sudoers. No action needed.",
          options
        );
      }
    } catch (error) {
      bot.sendMessage(chatID, `${error.message}`, options);
    }
  });
};
