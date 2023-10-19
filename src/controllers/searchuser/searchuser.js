const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function searchuser(req, res) {
  try {
    const { query } = req.query;
    const users = await prisma.users.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: query,
            },
          },
          {
            lastName: {
              contains: query,
            },
          },
        ],
      },
    });
    return res.status(200).send({ success: true, data: users });
  } catch (error) {
    return res.status(500).send({ msg: "failed", error: error });
  }
}

module.exports = searchuser;
