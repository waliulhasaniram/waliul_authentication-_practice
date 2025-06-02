require("dotenv").config()
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandeler");
const jwt = require("jsonwebtoken");
const userService = require("../services/user.service")


// middleware/auth.middleware.js
const verifyToken = asyncHandler(async(req, res, next) => {
    try {
        // 1. Handle missing Authorization header safely
        const token = req.cookies?.accessToken || 
                     (req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : null);

        if(!token) {
            throw new ApiError(401, "Authorization token required");
        }

        // 2. Verify token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        // 3. Find user and attach to request
        const user = await userService.findUserById(decodedToken._id);
        
        if(!user) {
            throw new ApiError(401, "Invalid access token");
        }

        // 4. Attach user to request
        req.user = user;
        next();
        
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

module.exports = verifyToken