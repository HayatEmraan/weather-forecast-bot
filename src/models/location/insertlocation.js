const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const insertlocation = async (location, id) => {
  try {
    const insert = await prisma.location.create({
      data: {
        ...location,
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
};

module.exports = insertlocation;
