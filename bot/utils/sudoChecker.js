// Only specified user can run the bot

import { SUDOER } from "../db/mjSchema.js";

export const sudoChecker = async (
  userId,
  username,
  sudoUser,
  bot,
  chatID,
  options
) => {
  if (userId !== sudoUser) {
    const foundSudoer = await SUDOER.findOne(
      { sudoer: chatID } || { sudoer: userId }
    );
    if (!foundSudoer) {
      bot.sendMessage(
        chatID,
        `@${username} you don't have enough permission to run this command.`,
        options || {}
      );
      return false;
    }
  }

  return true;
};
