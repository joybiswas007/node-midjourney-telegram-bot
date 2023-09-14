import axios from "axios";
import fs from "fs";

export const saveAndSendPhoto = async (imgUrl, imgDir, filePath, chatID, bot, options) => {
    try {
      if (!fs.existsSync(imgDir)) {
        fs.mkdirSync(imgDir);
      }
      await axios
        .get(imgUrl, { responseType: "arraybuffer" })
        .then((response) => {
          fs.writeFileSync(filePath, Buffer.from(response.data, "binary"));
          const stream = fs.createReadStream(filePath);
          bot.sendDocument(chatID, stream, options || {});
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };