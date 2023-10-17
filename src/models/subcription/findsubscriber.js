const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const findsubscriber = async () => {
  try {
    const findusers = await prisma.subscriptions.findMany({
      where: {
        subscribed: true,
      },
      include: {
        user: {
          include: {
            location: {
              select: {
                lat: true,
                long: true,
              },
            },
          },
        },
      },
    });
    return {
      success: true,
      data: findusers,
    };
  } catch (error) {
    return {
      failed: true,
      error: error,
    };
  }
};

module.exports = findsubscriber;
