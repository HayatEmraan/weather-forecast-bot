const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function blockuser(req, res) {
  try {
    const { id } = req.query;
    const blockuser = await prisma.users.update({
      where: {
        telegram_id: id.toString(),
      },
      data: {
        blocked: true,
      },
    });
    return res.status(200).send({ success: true, data: blockuser });
  } catch (error) {
    return res.status(500).send({ msg: failed, error: error });
  }
}

module.exports = blockuser;
