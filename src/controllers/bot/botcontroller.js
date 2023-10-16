const TelegramBot = require("node-telegram-bot-api");
const token = "6583143962:AAHwTboZHvRYA0LVo5nALYxEqtesThSsHI0";
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const name = msg?.from?.first_name || "there";
  const chatId = msg.chat.id;
  bot
    .sendMessage(chatId, "Welcome to Weather Forecast Bot !", {
      reply_markup: JSON.stringify({
        remove_keyboard: true,
      }),
    })
    .then(() => {
      bot.sendMessage(
        chatId,
        `Hello ${name} ! \nThis bot can show you the weather and time for any city. To use it, please choose an option below :`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Get Weather", callback_data: "get_weather" },
                { text: "Get Time", callback_data: "get_time" },
              ],
              [
                { text: "Your Information", callback_data: "get_info" },
                {
                  text: "Subscription",
                  callback_data: "get_subscription",
                },
              ],
            ],
          },
        }
      );
    });
});

bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;
  const name = callbackQuery?.from?.first_name || "there";
  console.log(callbackQuery);

  switch (data) {
    case "get_weather":
      const opts = {
        reply_markup: JSON.stringify({
          keyboard: [
            [
              {
                text: "Set Location",
                request_location: true,
                callback_data: "get_location",
              },
            ],
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        }),
      };
      const options = {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [
              {
                text: "Cancel",
                callback_data: "cancel",
              },
            ],
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        }),
      };
      bot
        .sendMessage(
          chatId,
          "<em>N.B. Your location will automatically captured! Provide your location permission by clicking on the button below</em> \n\n<b>Note: This can't be done manually</b>",
          {
            parse_mode: "HTML",
            ...opts,
          }
        )
        .then(() => {
          bot.sendMessage(
            chatId,
            "Please click on the Set Location button or to cancel the request:",
            {
              reply_markup: options.reply_markup,
            }
          );
        });

      break;
    case "get_time":
      bot.editMessageText(
        "Please enter the name of the city or send /stop to cancel:",
        {
          chat_id: chatId,
          message_id: callbackQuery.message.message_id,
          reply_markup: {
            inline_keyboard: [[{ text: "Back", callback_data: "cancel" }]],
          },
        }
      );
      break;
    case "get_info":
      const username = callbackQuery.from.username;
      const firstName = callbackQuery.from.first_name || "";
      const id = callbackQuery.from.id;
      const lastName = callbackQuery.from.last_name || "";
      bot.sendMessage(
        chatId,
        ` Your ID is ${id} \nYour Name is ${firstName} ${lastName} ! \nYour Username is ${username} \nThank you for using Weather Forecast !`,
        {
          reply_markup: {
            inline_keyboard: [[{ text: "Back", callback_data: "cancel" }]],
          },
        }
      );
      break;
    case "cancel":
      bot
        .sendMessage(chatId, "Operation canceled.", {
          reply_markup: JSON.stringify({
            remove_keyboard: true,
          }),
        })
        .then(() => {
          bot.sendMessage(
            chatId,
            `Hello ${name} ! \nThis bot can show you the weather and time for any city. To use it, please choose an option below :`,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    { text: "Get Weather", callback_data: "get_weather" },
                    { text: "Get Time", callback_data: "get_time" },
                  ],
                  [
                    { text: "Your Information", callback_data: "get_info" },
                    {
                      text: "Daily Subscription",
                      callback_data: "get_subscription",
                    },
                  ],
                ],
              },
            }
          );
        });

      break;
    case "get_location":
      bot
        .sendMessage(
          chatId,
          "Your location has been captured! You can get the weather now by click Get Weather button. Hurray! Please wait...",
          {
            reply_markup: JSON.stringify({
              remove_keyboard: true,
            }),
          }
        )
        .then(() => {
          bot.sendMessage(
            chatId,
            `Hello ${name} ! \nThis bot can show you the weather and time for any city. To use it, please choose an option below :`,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    { text: "Get Weather", callback_data: "get_weather" },
                    { text: "Get Time", callback_data: "get_time" },
                  ],
                  [
                    { text: "Your Information", callback_data: "get_info" },
                    {
                      text: "Daily Subscription",
                      callback_data: "get_subscription",
                    },
                  ],
                ],
              },
            }
          );
        });
    default:
      break;
  }
});

bot.on("location", (msg) => {
  console.log(msg.location.latitude);
  console.log(msg.location.longitude);
});

module.exports = bot;
