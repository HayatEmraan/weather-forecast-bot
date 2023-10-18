const botupdate = require("../../models/bot/botupdate");

const updatebot = async (req, res) => {
  try {
    const body = req.body;
    const update = await botupdate(body);
    if (update.error) {
      return res.status(500).send({ msg: failed, error: update.error });
    }
    return res.status(200).send(update);
  } catch (error) {
    return res.status(500).send({ msg: failed, error: error });
  }
};

module.exports = updatebot;
