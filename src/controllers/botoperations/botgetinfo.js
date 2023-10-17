const botinfo = (callbackQuery, chatId, bot) => {
  const username = callbackQuery.from.username;
  const firstName = callbackQuery.from.first_name || "";
  const id = callbackQuery.from.id;
  const lastName = callbackQuery.from.last_name || "";

  bot.editMessageText(
    ` Your ID is ${id} \nYour Name is ${firstName} ${lastName} ! \nYour Username is ${username} \n\nThank you for using Weather Forecast !`,
    {
      chat_id: chatId,
      message_id: callbackQuery.message.message_id,
      reply_markup: {
        inline_keyboard: [[{ text: "Back", callback_data: "get_back" }]],
      },
    }
  );
};

module.exports = botinfo;
