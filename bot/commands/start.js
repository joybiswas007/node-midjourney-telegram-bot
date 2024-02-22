export const startBot = bot => {
  bot.onText(/\/start|\/echo/, msg => {
    const { id: chatId } = msg.chat;
    const msgId = msg.message_id;
    const { first_name } = msg.from;
    const options = {
      parse_mode: "HTML",
      reply_to_message_id: msgId
    };
    try {
      bot.sendMessage(
        chatId,
        `Hi, ${first_name}. I'm an Image Generator bot. Try me\n<code>/mj whats on my mind. </code> `,
        options
      );
    } catch (error) {
      bot.sendMessage(chatId, `${error.message}`, options);
    }
  });
};
