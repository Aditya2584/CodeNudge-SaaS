const asyncHandler = require('../utils/asyncHandler');
const platformService = require('../services/platform.service');
const ApiResponse = require('../utils/ApiResponse');

const getLeetcodeUsername = asyncHandler(async (req, res) => {
    const leetcodeUsername = await platformService.getLeetcodeUsername(req.user._id);
    
    return res.status(200).json(
        new ApiResponse(200, { leetcodeUsername }, "LeetCode username retrieved successfully.")
    );
});

const updateLeetcodeUsername = asyncHandler(async (req, res) => {
    const { leetcodeUsername } = req.body;
    await platformService.updateLeetcodeUsername(req.user._id, leetcodeUsername);
    
    return res.status(200).json(
        new ApiResponse(200, {}, "Platform updated successfully.")
    );
});

module.exports = {
    getLeetcodeUsername,
    updateLeetcodeUsername
};
