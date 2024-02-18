# node-midJourney-telegram-bot

A Telegram bot created in Node.js using the unofficial Midjourney Node.js client.

## Commands

```
User Commands:
/start or /echo
/mj "prompt"

Owner Commands:
/sudo 123456789 - pass user id to add users to sudoers
/rm 1234556789 - pass user id to remove user from sudoers
/ls - list how many users are added to sudoers
```

## Requirements

Navigate to the cloned directory

Install dependencies: `npm install`

Create a `.env` or copy the `.env.sample` to `.env` using this command
`cp .env.sample .env` file inside the directory and fill in all the details.

Example `.env` file:

```
#Paste the owner telegram user id
SUDO_USER=1234567789

#Grab your telegram bot token from BotFather
TG_BOT_TOKEN=1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ

#Discord Server ID. Add midjourney bot in your server
SERVER_ID=12345678901111

#Discord Channel ID
CHANNEL_ID=01234567899012312432

#Grab the 72 character long SALAI_TOKEN from Discord
SALAI_TOKEN=72CHARLONGSALAITOKEN

#Database
MONGO_DB=EnterYourMongoDBUrlHere
```

### Start server

To run the server on your local machine, execute the following command: `npm run dev`
<br>On the server, use: `npm run start`
You also have the option to run it using `pm2`. If you don't have `pm2` installed, install it using the following command: `npm i pm2 -g`. Ensure pm2 automatically starts up when the server restarts.
To launch the API, use: `npm run server:up`
To refresh the API, use: `npm run server:restart`
To shut down the API, use: `npm run server:down`

It's recommend to running the API with PM2. It allows you to keep your Node. js applications running continuously: PM2 can automatically restart your application if it crashes, and it can also automatically reload your application when you update your code

## Functionality

The bot currently supports image generation, variants generation, and upscaling. Feel free to send pull requests.

## Credits

Thanks a ton to [erictik/midjourney-api](https://github.com/erictik/midjourney-api) for the amazing library to interact with Midjourney ❤️
