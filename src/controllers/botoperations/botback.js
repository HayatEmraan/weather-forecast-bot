const botback = (bot, name, chatId, callbackQuery) => {
  bot.editMessageText(
    `Hello ${name} ! \nThis bot can show you the weather and time for any city. To use it, please choose an option below :`,
    {
      chat_id: chatId,
      message_id: callbackQuery.message.message_id,
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
};

module.exports = botback;
