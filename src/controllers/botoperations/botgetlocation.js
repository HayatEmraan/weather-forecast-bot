const botlocation = (bot, name, chatId) => {
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
                  text: "Subscription",
                  callback_data: "get_subscription",
                },
              ],
            ],
          },
        }
      );
    });
};
 

module.exports = botlocation;