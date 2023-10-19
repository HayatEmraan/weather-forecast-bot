const app = require("./app");
const bot = require("./src/controllers/bot/botcontroller");
const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await bot
});
