const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function exituser(id) {
  try {
    const findOne = await prisma.users.findUnique({
      where: {
        telegram_id: id,
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

module.exports = exituser;
