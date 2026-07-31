const User = require('../models/user.model');
const revisionRepository = require('../repositories/revision.repository');
const ApiError = require('../utils/ApiError');

class RevisionService {
    async enqueueProblem(userId, problemId) {
        // Use atomic $addToSet to prevent duplicates and VersionErrors (ParallelSaveError)
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { revisionQueue: problemId } },
            { new: true }
        );

        if (!updatedUser) {
            throw new ApiError(404, "User not found");
        }
    }

    async getTodaysRevision(userId) {
        const queue = await revisionRepository.getRevisionQueue(userId);
        if (!queue || queue.length === 0) {
            return [];
        }
        
        // Return max 3 problems from the front
        return queue.slice(0, 3);
    }

    async completeTodaysRevision(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (user.revisionQueue.length === 0) {
            return [];
        }

        // Take max 3 elements from the front
        const takenCount = Math.min(3, user.revisionQueue.length);
        const takenProblems = user.revisionQueue.splice(0, takenCount);
        
        // Append them to the back
        user.revisionQueue.push(...takenProblems);

        // Save the updated queue
        await user.save();
        
        // Populate and return the rotated problems
        const populatedUser = await user.populate('revisionQueue');
        const rotatedProblems = populatedUser.revisionQueue.slice(-takenCount);
        
        // Filter out any nulls in case some problems were deleted from DB
        return rotatedProblems.filter(p => p !== null);
    }
}

module.exports = new RevisionService();
