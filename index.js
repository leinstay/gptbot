import { createRequire } from "module";
import { ChatGPTAPI } from "chatgpt";

const require = createRequire(import.meta.url);
const config = require("./config.json");
const { Client, GatewayIntentBits } = require("discord.js");

var processing = false;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
  ],
});

const api = new ChatGPTAPI({
  sessionToken: config.OAISession,
});

const conversation = api.getConversation();

client.on("messageCreate", async (message) => {
  if (
    message.author.bot ||
    message.content.includes("@here") ||
    message.content.includes("@everyone") ||
    (config.channelsWhitelist.length > 0 &&
      !config.channelsWhitelist.includes(message.channel.id))
  )
    return false;

  if (message.mentions.has(client.user.id)) {
    if (
      config.usersWhitelist.length > 0 &&
      !config.usersWhitelist.includes(message.author.id)
    ) {
      await message.reply(config.accessMessage);
      return false;
    }

    if (!processing) {
      processing = true;

      const status = await message.reply(config.processingMessage);
      const question = capitalizeFirstLetter(
        message.content.replace("<@" + config.botID + ">", "").trim()
      );

      try {
        await api.ensureAuth();
        const answer = await conversation.sendMessage(question, {
          timeoutMs: 5 * 60 * 1000,
        });

        await message.reply(answer);
        status.delete();
      } catch (e) {
        status.edit(e);
      } finally {
        processing = false;
      }
    } else {
      message.reply(config.waitingMessage);
    }
  }
});

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

client.login(config.discordToken);
