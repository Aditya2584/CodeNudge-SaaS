const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/auth.service');
const ApiResponse = require('../utils/ApiResponse');

const signup = asyncHandler(async (req, res) => {
    const user = await authService.signup(req.body);
    
    return res.status(201).json(
        new ApiResponse(201, user, "User registered successfully")
    );
});

const signin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { user, accessToken } = await authService.signin(email, password);

    return res.status(200).json(
        new ApiResponse(200, { user, token: accessToken }, "User logged in successfully")
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await authService.getCurrentUser(req.user);
    
    return res.status(200).json(
        new ApiResponse(200, user, "Current user fetched successfully")
    );
});

const logout = asyncHandler(async (req, res) => {
    await authService.logout(req.user);
    
    return res.status(200).json(
        new ApiResponse(200, {}, "Logged out successfully.")
    );
});

module.exports = {
    signup,
    signin,
    getCurrentUser,
    logout
};
