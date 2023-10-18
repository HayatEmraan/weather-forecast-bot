const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
async function botupdate(botData) {
  try {
    await prisma.bot.deleteMany({});
    const insert = await prisma.bot.create({
      data: botData,
    });
    return {
      success: true,
      data: insert,
    };
  } catch (error) {
    return {
      msg: failed,
      error: error,
    };
  }
}

async function getbot() {
  try {
    const findbot = await prisma.bot.findMany({});
    return {
      success: true,
      data: findbot,
    };
  } catch (error) {
    return {
      failed: true,
      error: error,
    };
  }
}

module.exports = {
  botupdate,
  getbot,
};
