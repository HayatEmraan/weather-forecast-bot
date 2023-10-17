const exitlocation = require("../../models/location/findlocation");
const getWeatherData = require("../bot/getweather");

const bottime = async (chatId, data, name, bot, callbackQuery) => {
  const location = await exitlocation(chatId.toString());
  const lat = location?.data?.lat;
  const long = location?.data?.long;

  if (lat && long) {
    const weather = await getWeatherData(lat, long);
    const utcTime = Math.floor(Date.now() / 1000);
    const currentTime = utcTime + weather.timezone;
    const LocalTime = new Date(currentTime * 1000);
    const local = LocalTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const weatherParagraph = `🌦 ** Current UTC time in ${weather.cityName}, ${weather.country} **
- Time: ${local} (UTC)`;
    bot.editMessageText(weatherParagraph, {
      chat_id: chatId,
      message_id: callbackQuery.message.message_id,
      reply_markup: {
        inline_keyboard: [[{ text: "Back", callback_data: "get_back" }]],
      },
    });
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

module.exports = bottime;
