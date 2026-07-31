const asyncHandler = require('../utils/asyncHandler');
const submissionService = require('../services/submission.service');
const ApiResponse = require('../utils/ApiResponse');

const syncSubmission = asyncHandler(async (req, res) => {
    const result = await submissionService.handleSubmission(req.user._id, req.body);
    
    return res.status(200).json(
        new ApiResponse(200, {}, result.message)
    );
});

module.exports = {
    syncSubmission
};
