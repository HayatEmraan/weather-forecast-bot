const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getblockuser = async (id) => {
  try {
    const result = await prisma.blockuser.findUnique({
      where: {
        telegram_id: id.toString(),
      },
    });
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      failed: true,
      error: error,
    };
  }
};

module.exports = getblockuser;
