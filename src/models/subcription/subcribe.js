const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function subscribe(id, decision) {
  try {
    const insert = await prisma.subscriptions.upsert({
      where: {
        telegram_id: id,
      },
      update: {
        subscribed: decision,
        user: {
          connect: {
            telegram_id: id,
          },
        },
      },
      create: {
        subscribed: decision,
        user: {
          connect: {
            telegram_id: id,
          },
        },
      },
    });
    return {
      success: true,
      data: insert,
    };
  } catch (error) {
    return {
      failed: true,
      error: error,
    };
  }
}
async function getsubscribe(id) {
  try {
    const findOne = await prisma.subscriptions.findUnique({
      where: {
        telegram_id: id,
        subscribed: true,
      },
    });
    return {
      success: true,
      data: findOne,
    };
  } catch (error) {
    return {
      failed: true,
      error: error,
    };
  }
}

module.exports = {
  subscribe,
  getsubscribe,
};
