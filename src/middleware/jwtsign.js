const jose = require("jose");

const jwtsign = async (id) => {
  try {
    const secret = new TextEncoder().encode(
      "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
    );
    const alg = "HS256";

    const jwt = await new jose.SignJWT({ id })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer("http://localhost:3000/")
      .setExpirationTime("2h")
      .sign(secret);

    return jwt;
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "failed", error: error });
  }
};


module.exports = jwtsign;