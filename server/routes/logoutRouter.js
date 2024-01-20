const jwt = require("jsonwebtoken");

const logoutRouter = (req,res) => {
    console.log(req.headers)
    const cookies = req.headers['cookie'];
    console.log(cookies);
    const decodedToken = jwt.verify(cookies.token, process.env.JWT_SECRET, { ignoreExpiration: true });
    try {
        decodedToken.exp = Math.floor(Date.now() / 1000) - 1;
        const token = jwt.sign(decodedToken, process.env.JWT_SECRET);
        console.log("revoked token; "+decodedToken)
        res.cookie('token', token).status(200).json("token revoked");
        return;
    } catch (err) {
        console.log(err)
        res.status(422).json("invalid token, impossible to sign");
    }

    console.log(decodedToken)
    res.status(422).json("invalid token, impossible to decode");
}
module.exports = logoutRouter;