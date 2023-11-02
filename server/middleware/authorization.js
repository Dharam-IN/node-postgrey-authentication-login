const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        // Check for the JWT token in the request headers
        const jwtToken = req.header("token");
        if (!jwtToken) {
            return res.status(401).json({ message: "Unauthorized: Missing Token" });
        }

        // Verify the JWT token with the secret from the environment variables
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

        // Attach the user data from the token to the request object
        req.user = payload.user;

        // Continue with the next middleware or route handler
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(401).json({ message: "Unauthorized: Invalid Token" });
    }
};
