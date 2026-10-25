# GPT Bot

Discord bot that answers mentions with GPT-3 through the [chatgpt](https://github.com/transitive-bullshit/chatgpt-api) library. Everyone on the server sees the conversation and can join in. Written in December 2022, before the official API existed, so it relies on a browser session token, and OpenAI has since broken that method.

![Chatting with the bot](https://user-images.githubusercontent.com/8215580/206561946-c9ac8ad0-e5cf-4b65-909e-d006c8837715.png)

## Requirements

Node.js 16 or newer, a Discord application with a bot token, and an OpenAI session token.

## Installation

```bash
git clone https://github.com/leinstay/gptbot.git
cd gptbot
npm install
```

Create a [Discord application](https://discord.com/developers/applications), add a bot to it and invite the bot to your server.

## Running

```bash
node index.js
```

For a long-running bot use a process manager:

```bash
pm2 start index.js --name Bot --log bot.log
```

Mention the bot in a whitelisted channel and start chatting.

## Configuration

The bot reads `config.json` next to `index.js`.

| Key | Meaning |
|---|---|
| `discordToken` | Bot token from the Discord developer portal |
| `botID` | Application ID of the bot |
| `OAISession` | OpenAI session token, see the [chatgpt library docs](https://github.com/transitive-bullshit/chatgpt-api#session-tokens) |
| `channelsWhitelist` | Channel IDs the bot answers in. Empty means everywhere |
| `usersWhitelist` | User IDs allowed to talk to the bot. Empty means everyone |
| `processingMessage` | Reply shown while a request is running |
| `waitingMessage` | Reply shown when another user's request is still running |
| `accessMessage` | Reply shown when the user is not whitelisted |

## License and credits

MIT License, see [LICENSE](LICENSE).

* [chatgpt](https://github.com/transitive-bullshit/chatgpt-api) by Travis Fischer: MIT License
* [discord.js](https://discord.js.org/): Apache-2.0 License
