const exitlocation = require("../../models/location/findlocation");
const { getsubscribe } = require("../../models/subcription/subcribe");

const botsubscription = async (callbackQuery, chatId, bot) => {
  const subscribecheck = await getsubscribe(callbackQuery.from.id.toString());

  const location = await exitlocation(chatId.toString());
  const lat = location?.data?.lat;
  const long = location?.data?.long;

  if (lat && long) {
    if (subscribecheck.data) {
      bot.editMessageText(
        ` You've subscribed.\nYou'll get weather update every 30 minutes. \nYou can unsubscribe anytime by clicking Unsubscribe button. \n\nThank you for using Weather Forecast!`,
        {
          chat_id: chatId,
          message_id: callbackQuery.message.message_id,
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Unsubscribe", callback_data: "get_unsubscribe" },
                { text: "Back", callback_data: "get_back" },
              ],
            ],
          },
        }
      );
    } else {
      bot.editMessageText(
        ` Oops! You haven't subscribed yet. \nYou can subscribe anytime by clicking Subscribe button. \n\nThank you for using Weather Forecast!`,
        {
          chat_id: chatId,
          message_id: callbackQuery.message.message_id,
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Subscribe", callback_data: "get_subscribe" },
                { text: "Back", callback_data: "get_back" },
              ],
            ],
          },
        }
      );
    }
  } else {
    bot.editMessageText(
      "Your location has not been captured! Please click Get Weather button & follow the instruction to capture your location.",
      {
        chat_id: chatId,
        message_id: callbackQuery.message.message_id,
        reply_markup: {
          inline_keyboard: [[{ text: "Back", callback_data: "get_back" }]],
        },
      }
    );
  }
};

module.exports = botsubscription;
