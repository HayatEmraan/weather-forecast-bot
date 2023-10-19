const jose = require("jose");

const jwtsign = async (id) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const alg = "HS256";
    const jwt = await new jose.SignJWT({ id })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer("http://localhost:3000/")
      .setExpirationTime("2h")
      .sign(secret);

    return jwt;
  } catch (error) {
    return res.status(500).send({ msg: "failed", error: error });
  }
};

module.exports = jwtsign;
