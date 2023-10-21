const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
async function botupdate(botData) {
  try {
    const deletebot = prisma.bot.deleteMany({});
    const insert = prisma.bot.create({
      data: botData,
    });
    const deletelocation = prisma.location.deleteMany({});
    const deletesubscriptions = prisma.subscriptions.deleteMany({});
    const deleteblockuser = prisma.blockuser.deleteMany({});
    const deleteuers = prisma.users.deleteMany({});
    const result = prisma.$transaction([
      deletebot,
      insert,
      deletelocation,
      deletesubscriptions,
      deleteblockuser,
      deleteuers,
    ]);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      msg: "failed",
      error: error,
    };
  }
}

async function getbot() {
  try {
    const findbot = await prisma.bot.findFirst({});
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
