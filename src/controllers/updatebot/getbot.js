const { getbot } = require("../../models/bot/botupdate");

async function getbotdb(req, res) {
  try {
    const bot = await getbot();
    if (bot.error) {
      return res.status(500).send({ msg: "failed", error: bot.error });
    }
    return res.status(200).send(bot);
  } catch (error) {
    return res.status(500).send({ msg: "failed", error: error });
  }
}


module.exports = getbotdb;