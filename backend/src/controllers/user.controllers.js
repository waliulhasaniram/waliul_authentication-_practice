const UserData = require("../models/user.model");
const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")
const asyncHandler = require("../utils/asyncHandeler")
const userService = require("../services/user.service")

const signup_controller = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user exists using service
    const existingUser = await userService.findUserByEmail(email);
    if(existingUser) {
        throw new ApiError(400, "User already exists");
    }

    // Create user using service
    const newUser = await userService.createUser({ username, email, password });
    
    if(!newUser) {
        throw new ApiError(500, "Failed to create user");
    }

    res.status(201).json(
        new ApiResponse(201, newUser, "User created successfully")
    );
});

const generateAccessAndRefreshToken = async(_id)=> {
    try {
        const userToken = await userService.findOnlyTheId(_id)
        const accessToken = await userToken.generateAccessToken()
        const refreshToken = await userToken.generateRefreshToken()

        userToken.refreshToken = refreshToken
        await userToken.save({validateBeforeSave: false})
        return {accessToken, refreshToken}

    } catch (error) {
        console.log({error})
        throw new ApiError(400, "can't generate access and refresh token" + error.message)
    }
}

const signin_controller = asyncHandler(async(req, res)=>{
    const {email, password} = req.body

    const ifUserExists = await userService.findUserByEmail(email)
    //console.log(ifUserExists)

    if(!ifUserExists){
        throw new ApiError(400, "user doesn't exist")
    }else{
        const comparePassword = await ifUserExists.isPasswordcorrect(password)

        if(!comparePassword) {
            throw new ApiError(400, "invalid credentials")
        }

        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(ifUserExists._id)

        const userLogin = await userService.findUserById(ifUserExists._id)
        
        const options={
            httpOnly : true,
            secure: true
        }

        res.cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).status(200)
        .json(new ApiResponse(200, {userLogin, accessToken, refreshToken}, "successfully loggedin"))
    }
})


const logout_user = asyncHandler(async (req, res) => {
    //console.log("logout controller " + req.user._id);
    
    // 1. Await the token removal
    await userService.removeRefreshToken(req.user._id);
    
    const options = { 
        httpOnly: true, 
        secure: true 
    };

    // 2. cookie clearing
    return res
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .status(200)
        .json(new ApiResponse(200, {}, "Logout successful"));
});

const user_data = asyncHandler(async (req, res) => {
     res.status(200).json(new ApiResponse(200, req.user, "logged in user date"))
})

module.exports = {signin_controller, signup_controller, logout_user, user_data}