const TelegramBot = require("node-telegram-bot-api");
const botweather = require("../botoperations/botgetweather");
const bottime = require("../botoperations/botgettime");
const botinfo = require("../botoperations/botgetinfo");
const botcancel = require("../botoperations/botgetcancel");
const botlocation = require("../botoperations/botgetlocation");
const botstart = require("../botoperations/botgetstart");
const exituser = require("../../models/users/exituser");
const insertuser = require("../../models/users/insertuser");
const exitlocation = require("../../models/location/findlocation");
const insertlocation = require("../../models/location/insertlocation");
const botback = require("../botoperations/botback");
const botsubscription = require("../botoperations/getsubscription");
const { subscribe } = require("../../models/subcription/subcribe");
const findsubscriber = require("../../models/subcription/findsubscriber");
const getWeatherData = require("./getweather");
const token = "6583143962:AAHwTboZHvRYA0LVo5nALYxEqtesThSsHI0";
const bot = new TelegramBot(token, { polling: true });
const cron = require("node-cron");

bot.onText(/\/start/, async (msg) => {
  const name = msg?.from?.first_name || "there";
  const chatId = msg.chat.id;
  const userinfo = msg?.from;
  const user = {
    telegram_id: userinfo?.id.toString(),
    firstName: userinfo?.first_name,
    lastName: userinfo?.last_name,
    username: userinfo?.username,
  };
  const exitinguser = await exituser(userinfo?.id.toString());
  if (exitinguser.data) {
    console.log("exiting user");
  } else {
    await insertuser(user);
  }
  await botstart(chatId, name, bot);
});

bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;
  const name = callbackQuery?.from?.first_name || "there";

  switch (data) {
    case "get_weather":
      await botweather(chatId, data, name, bot, callbackQuery);
      break;
    case "get_time":
      await bottime(chatId, data, name, bot, callbackQuery);
      break;
    case "get_info":
      await botinfo(callbackQuery, chatId, bot);
      break;
    case "cancel":
      await botcancel(bot, name, chatId);
      break;
    case "get_location":
      await botlocation(bot, name, chatId);
      break;
    case "get_subscription":
      await botsubscription(callbackQuery, chatId, bot);
      break;
    case "get_back":
      await botback(bot, name, chatId, callbackQuery);
      break;
    case "get_unsubscribe":
      await subscribe(callbackQuery.from.id.toString(), false);
      await botsubscription(callbackQuery, chatId, bot);
      break;
    case "get_subscribe":
      await subscribe(callbackQuery.from.id.toString(), true);
      await botsubscription(callbackQuery, chatId, bot);
      break;
    default:
      break;
  }
});

bot.on("message", async (msg) => {
  const textlocation =
    "N.B. Your location will automatically captured! Provide your location permission by clicking on the button below \n" +
    "\n" +
    "Note: This can't be done manually";
  if (msg.location && msg.reply_to_message.text === textlocation) {
    const latitude = msg.location.latitude;
    const longitude = msg.location.longitude;

    const locationData = {
      lat: latitude.toString(),
      long: longitude.toString(),
    };

    const userID = msg?.from?.id.toString();
    const exitinglocation = await exitlocation(userID);
    if (exitinglocation.data) {
      console.log("exiting location");
    } else {
      await insertlocation(locationData, userID);
    }
  }
});

async function subscriber() {
  const nothing = await findsubscriber();
  for (const activeSubscriber of nothing.data) {
    const userlocation = activeSubscriber?.user?.location;
    const weather = await getWeatherData(userlocation?.lat, userlocation?.long);
    console.log(weather);
    const weatherParagraph = `🌦 ** Weather in ${weather.cityName}, ${weather.country} **
- Temperature: ${weather.temperature}°C
- Min Temperature: ${weather.temp_min}°C
- Max Temperature: ${weather.temp_max}°C
- Sunrise: ${weather.sunriseLocalTime}
- Sunset: ${weather.sunsetLocalTime} \n\n<i><b>This is an auto generated Weather Forecast!</b></i>`;

    bot.sendMessage(activeSubscriber?.telegram_id, weatherParagraph, {
      parse_mode: "HTML",
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
  }
}

cron.schedule("0 */1 * * *", async () => {
  await subscriber();
});

module.exports = bot;
