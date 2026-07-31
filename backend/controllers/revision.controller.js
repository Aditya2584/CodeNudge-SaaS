const revisionService = require('../services/revision.service');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

const getTodaysRevision = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const questions = await revisionService.getTodaysRevision(userId);

    return res.status(200).json(
        new ApiResponse(
            200,
            questions,
            "Today's revision questions fetched successfully."
        )
    );
});

const completeTodaysRevision = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    await revisionService.completeTodaysRevision(userId);

    return res.status(200).json(
        new ApiResponse(
            200,
            null, // or the rotated questions if you want to include them in the data
            "Revision queue updated successfully."
        )
    );
});

module.exports = {
    getTodaysRevision,
    completeTodaysRevision
};
