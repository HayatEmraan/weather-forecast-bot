const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
async function getusers(req, res) {
  try {
    const users = await prisma.users.findMany({});

    console.log(req.cookies);
    return res.status(200).send({ success: true, data: users, cookie: req.cookies });
  } catch (error) {
    return res.status(500).send({ msg: failed, error: error });
  }
}

module.exports = getusers;
