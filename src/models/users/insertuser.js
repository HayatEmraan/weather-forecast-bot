const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function insertuser(user) {
  try {
    const insert = await prisma.users.create({
      data: user,
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

module.exports = insertuser;
