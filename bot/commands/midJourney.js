import { Midjourney } from "midjourney";
import { saveAndSendPhoto } from "../utils/saveAndSendPhoto.js";
import { MJ } from "../db/mjSchema.js";
import { sudoChecker } from "../utils/sudoChecker.js";

export const midJourney = (bot, sudoUser) => {
  let userMessageId;
  let prompt;
  let client;
  let Imagine;
  let Variation;
  bot.onText(/\/mj/, async (msg, match) => {
    userMessageId = msg.message_id;
    prompt = msg.text.replace(match[0], "").trim();
    const { id: userId, username, first_name: firstname } = msg.from;
    const { id: chatID } = msg.chat;
    const options = {
      reply_to_message_id: userMessageId
    };
    if (
      !(await sudoChecker(
        userId,
        username || firstname,
        sudoUser,
        bot,
        chatID,
        options
      ))
    ) {
      return;
    }
    if (prompt.length === 0) {
      return bot.sendMessage(chatID, "Prompt can't be empty", options);
    }
    bot.sendMessage(
      chatID,
      `prompt: ${prompt} received generating image...`,
      options
    );

    try {
      const { SERVER_ID, CHANNEL_ID, SALAI_TOKEN } = process.env;
      client = new Midjourney({
        ServerId: SERVER_ID,
        ChannelId: CHANNEL_ID,
        SalaiToken: SALAI_TOKEN,
        // Debug: True,
        Ws: true
      });
      await client.init();
      Imagine = await client.Imagine(prompt, (uri, progress) => {
        console.log(`Loading: ${uri}, progress: ${progress}`);
      });

      const options = {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [
              { text: "U1", callback_data: "U1" },
              { text: "U2", callback_data: "U2" },
              { text: "U3", callback_data: "U3" },
              { text: "U4", callback_data: "U4" }
            ],
            [
              { text: "V1", callback_data: "V1" },
              { text: "V2", callback_data: "V2" },
              { text: "V3", callback_data: "V3" },
              { text: "V4", callback_data: "V4" }
            ]
          ]
        })
      };
      const imgUrl = Imagine.uri;
      const imgDir = "./Imagines";
      const filePath = `${imgDir}/${userMessageId}.png`;
      bot.sendMessage(chatID, "Choose What to do");
      saveAndSendPhoto(imgUrl, imgDir, filePath, chatID, bot, options);
    } catch (error) {
      bot.sendMessage(chatID, error);
    }
  });

  bot.on("callback_query", async query => {
    const { id: chat_id, title: chat_name } = query.message.chat;
    const { message_id } = query.message;
    const selectedLabel = query.data;
    try {
      if (selectedLabel.includes("U")) {
        bot.sendMessage(chat_id, `Upscaling Image ${selectedLabel}`);
        const UCustomID = Imagine.options?.find(
          o => o.label === selectedLabel
        )?.custom;
        const Upscale = await client.Custom({
          msgId: Imagine.id,
          flags: Imagine.flags,
          customId: UCustomID,
          loading: (uri, progress) => {
            console.log(`Loading: ${uri}, progress: ${progress}`);
          }
        });

        const imgUrl = Upscale.uri;
        const imgDir = "./Upscales";
        const filePath = `${imgDir}/${message_id}.png`;
        const options = {
          reply_to_message_id: userMessageId
        };

        saveAndSendPhoto(imgUrl, imgDir, filePath, chat_id, bot, options);
      } else if (selectedLabel.includes("V")) {
        bot.deleteMessage(chat_id, message_id);
        bot.sendMessage(chat_id, `Generating Variants of ${selectedLabel}.`);
        const VCustomID = Imagine.options?.find(
          o => o.label === selectedLabel
        )?.custom;

        Variation = await client.Custom({
          msgId: Imagine.id,
          flags: Imagine.flags,
          customId: VCustomID,
          content: prompt,
          loading: (uri, progress) => {
            console.log(`Loading: ${uri}, progress: ${progress}`);
          }
        });

        const options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [
                { text: "1", callback_data: "scale1" },
                { text: "2", callback_data: "scale2" },
                { text: "3", callback_data: "scale3" },
                { text: "4", callback_data: "scale4" }
              ]
            ]
          })
        };

        const { id: user_id, username } = query.from;
        const mj = new MJ({
          query_id: query.id,
          message_id,
          chat_instance: query.chat_instance,
          chat_id,
          chat_name,
          user_id,
          username,
          prompt,
          data: selectedLabel
        });

        await mj.save();

        const imgUrl = Variation.uri;
        const imgDir = "./Variations";
        const filePath = `${imgDir}/${message_id}.png`;

        saveAndSendPhoto(imgUrl, imgDir, filePath, chat_id, bot, options);

        bot.on("callback_query", async query_up => {
          const upscaleLabel = query_up.data;
          let imgLabel;

          switch (upscaleLabel) {
            case "scale1":
              imgLabel = "U1";
              break;
            case "scale2":
              imgLabel = "U2";
              break;
            case "scale3":
              imgLabel = "U3";
              break;
            case "scale4":
              imgLabel = "U4";
              break;
            default:
              bot.sendMessage(chat_id, "Invalid selection");
              break;
          }

          bot.sendMessage(chat_id, `Upscaling Image from Variants ${imgLabel}`);

          const upscaleCustomID = Variation.options?.find(
            o => o.label === imgLabel
          )?.custom;

          const variationUpscale = await client.Custom({
            msgId: Variation.id,
            flags: Variation.flags,
            customId: upscaleCustomID,
            loading: (uri, progress) => {
              console.log(`Loading: ${uri}, progress: ${progress}`);
            }
          });

          console.log(variationUpscale);

          const imgUrl = variationUpscale.uri;
          const imgDir = "./VariationsUpscales";
          const filePath = `${imgDir}/${message_id}.png`;
          const options = {
            reply_to_message_id: userMessageId
          };
          saveAndSendPhoto(imgUrl, imgDir, filePath, chat_id, bot, options);
        });
      }
    } catch (error) {
      bot.sendMessage(chat_id, error, { reply_to_message_id: userMessageId });
    }
  });
};
