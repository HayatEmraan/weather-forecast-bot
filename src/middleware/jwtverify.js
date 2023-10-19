const jose = require("jose");

async function jwtverify(req, res, next) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const jwt = req.headers.authorization.split(" ")[1];
    if (!jwt) return res.status(401).send({ msg: "Unauthorized access" });
    const decoded = await jose.jwtVerify(jwt, secret);
    req.uid = decoded?.payload?.id;
    next();
  } catch (error) {
    return res.status(500).send({ msg: "failed", error: error });
  }
}

module.exports = jwtverify;
