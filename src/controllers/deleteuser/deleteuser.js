const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function deleteuser(req, res) {
  try {
    const { id } = req.query;
    const deleteuser = await prisma.users.delete({
      where: {
        telegram_id: id.toString(),
      },
    });
    return res.status(200).send({ success: true, data: deleteuser });
  } catch (error) {
    return res.status(500).send({ msg: "failed", error: error });
  }
}

module.exports = deleteuser;
