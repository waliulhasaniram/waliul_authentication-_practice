// services/user.service.js
const UserData = require("../models/user.model");

const createUser = async (userData) => {
    try {
        return await UserData.create(userData);
    } catch (error) {
        throw new Error(`User creation failed: ${error.message}`);
    }
};

const findUserByEmail = async (email) => {
    return await UserData.findOne({ email });
};

const findUserById = async (_id) => {
    return await UserData.findOne({_id:_id}).select({passwprd:0})
}

const findOnlyTheId = async (_id) => {
    return await UserData.findById({_id:_id})   
}

const findIdToVerifyToken = async (_id) => {
    return await UserData.findOne({_id: _id}).select({password: 0, refreshToken: 0})
}

const removeRefreshToken = async (_id) => {
    // Use $set: {refreshToken: null} instead of $unset
    return await UserData.findByIdAndUpdate(
        _id,
        { $set: { refreshToken: null } },
        { new: true }  // Return the updated document
    );
}

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    findOnlyTheId,
    findIdToVerifyToken,
    removeRefreshToken
};