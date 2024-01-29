# node-midJourney-telegram-bot
A Telegram bot created in Node.js using the unofficial Midjourney Node.js client.

## Commands
```
/start 
/mj "prompt" 
```

## Requirements
First clone the repo: 
``` git clone https://github.com/joybiswas007/node-midJourney-telegram-bot.git ```

Navigate to the cloned directory: 
``` cd node-midJourney-telegram-bot ```

Install dependencies: ``` npm install ```

Create a `.env` file inside the directory and fill in all the details.

Example `.env` file:
```
#Grab your telegram bot token from BotFather
TG_BOT_TOKEN=1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ

#Discord Server ID. Add midjourney bot in your server
SERVER_ID=12345678901111 

#Discord Channel ID
CHANNEL_ID=01234567899012312432

#Grab the 72 character long SALAI_TOKEN from Discord
SALAI_TOKEN=72CHARLONGSALAITOKEN

#Database
MONGODB_URI=EnterYourMongoDBUrlHere
```

## Usage
To run the bot, use the following command: `npm run dev` or `npm run start`


## Functionality
The bot currently supports image generation, variants generation, and upscaling. Feel free to send pull requests.

## Credits
Thanks a ton to [erictik/midjourney-api](https://github.com/erictik/midjourney-api) for the amazing library to interact with Midjourney ❤️