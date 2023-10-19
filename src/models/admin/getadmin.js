const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getadmin = async (req, res) => {
  try {
    const uid = req.uid;
    const admin = await prisma.admin.findUnique({
      where: {
        id: uid,
      },
    });
    if (!admin) return res.status(404).send({ msg: "Admin not found" });
    return res.status(200).send({ success: true, data: admin });
  } catch (error) {
    return res.status(500).send({ msg: "failed", error: error });
  }
};

module.exports = getadmin;
