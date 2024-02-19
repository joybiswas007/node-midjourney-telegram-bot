// Add sudo users who'll have ability to run the bot
import { SUDOER } from "../db/mjSchema.js";

export const sudoer = (bot, sudoUser) => {
  bot.onText(/\/sudo/, async (msg, match) => {
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
      const sudo = new SUDOER({
        sudoer: parseInt(sudoId, 10)
      });

      await sudo.save();

      bot.sendMessage(
        chatID,
        "User has been added to sudoers. They can use the bot now.",
        options
      );
    } catch (error) {
      bot.sendMessage(
        chatID,
        `userid: ${sudoId} is already added to sudoers. No need to add again.`,
        options
      );
    }
  });
};
