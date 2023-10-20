const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const blockmember = async (req, res) => {
  try {
    const { id } = req.query;
    const result = await prisma.$transaction([
      prisma.blockuser.create({
        data: {
          user: {
            connect: {
              telegram_id: id.toString(),
            },
          },
        },
      }),
      prisma.users.update({
        where: {
          telegram_id: id.toString(),
        },
        data: {
          blocked: true,
        },
      }),
    ]);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(500).send({ msg: "failed", error: error });
  }
};

const unblockmember = async (req, res) => {
  try {
    const { id } = req.query;
    const result = await prisma.$transaction([
      prisma.blockuser.delete({
        where: {
          telegram_id: id.toString(),
        },
      }),
      prisma.users.update({
        where: {
          telegram_id: id.toString(),
        },
        data: {
          blocked: false,
        },
      }),
    ]);

    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(500).send({ msg: "failed", error: error });
  }
};

const deletemember = async (req, res) => {
  try {
    const { id } = req.query;
    const result = await prisma.$transaction([
      prisma.users.update({
        where: {
          telegram_id: id.toString(),
        },
        data: {
          visibility: false,
        },
      }),
      prisma.blockuser.upsert({
        where: {
          telegram_id: id.toString(),
        },
        update: {
          user: {
            connect: {
              telegram_id: id.toString(),
            },
          },
        },
        create: {
          user: {
            connect: {
              telegram_id: id.toString(),
            },
          },
        },
      }),
    ]);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(500).send({ msg: "failed", error: error });
  }
};

module.exports = {
  deletemember,
  blockmember,
  unblockmember,
};
