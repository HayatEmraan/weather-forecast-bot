const { PrismaClient } = require("@prisma/client");
const jwtsign = require("../../middleware/jwtsign");

const prisma = new PrismaClient();

async function insertadmin(req, res) {
  try {
    const body = req.body;
    const find = await prisma.admin.findUnique({
      where: {
        email: body.email,
      },
    });
    if (find) {
      const jwt = await jwtsign(find.id);
      await res.cookie("jwt", jwt, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 900000,
      });
      return res.status(200).send({ success: true, data: find });
    } else {
      const insert = await prisma.admin.create({
        data: body,
      });
      const jwt = await jwtsign(insert.id);
      await res.cookie("jwt", jwt, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 900000,
      });
      return res.status(200).send({ success: true, data: insert });
    }
  } catch (error) {
    return res.status(500).send({ msg: "failed", error: error });
  }
}

module.exports = insertadmin;
