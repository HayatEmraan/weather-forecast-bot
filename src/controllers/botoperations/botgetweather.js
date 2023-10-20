const exitlocation = require("../../models/location/findlocation");
const getWeatherData = require("../bot/getweather");

const botweather = async (chatId, bot, callbackQuery) => {
  const location = await exitlocation(chatId.toString());
  const lat = location?.data?.lat;
  const long = location?.data?.long;
  if (lat && long) {
    const weather = await getWeatherData(lat, long);
    const weatherParagraph = `🌦 ** Weather in ${weather.cityName}, ${weather.country} **
- Temperature: ${weather.temperature}°C
- Min Temperature: ${weather.temp_min}°C
- Max Temperature: ${weather.temp_max}°C
- Sunrise: ${weather.sunriseLocalTime}
- Sunset: ${weather.sunsetLocalTime} \n\nThank you for using Weather Forecast !`;

    bot.editMessageText(weatherParagraph, {
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
    });
  } else {
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
  }
};

module.exports = botweather;
