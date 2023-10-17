const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function exitlocation(id) {
  try {
    const findOne = await prisma.location.findUnique({
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

module.exports = exitlocation;
