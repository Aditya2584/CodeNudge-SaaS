const User = require('../models/user.model');
const revisionRepository = require('../repositories/revision.repository');
const ApiError = require('../utils/ApiError');

class RevisionService {
    /**
     * Inserts a newly submitted problem strictly into the New Queue.
     * Problems in New Queue have never been emailed before.
     */
    async enqueueProblem(userId, problemId) {
        // Use atomic $addToSet on newQueue to prevent duplicates
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { newQueue: problemId } },
            { new: true }
        );

        if (!updatedUser) {
            throw new ApiError(404, "User not found");
        }
    }

    /**
     * Preview today's revision problems for a user.
     * Takes up to 3 problems from Revision Queue. If fewer than 3, supplements from New Queue.
     */
    async getTodaysRevision(userId) {
        const user = await revisionRepository.getUserQueues(userId);
        if (!user) {
            return [];
        }

        const revisionQueue = (user.revisionQueue || []).filter(p => p !== null);
        const newQueue = (user.newQueue || []).filter(p => p !== null);

        // Take up to 3 from Revision Queue
        const todaysRevision = revisionQueue.slice(0, 3);

        // If fewer than 3, fill remaining slots from New Queue
        if (todaysRevision.length < 3) {
            const needed = 3 - todaysRevision.length;
            const extraFromNew = newQueue.slice(0, needed);
            todaysRevision.push(...extraFromNew);
        }

        return todaysRevision;
    }

    /**
     * Executes the daily revision algorithm for a user:
     * STEP 1: Take up to 3 problems from the FRONT of Revision Queue.
     * STEP 2: Take up to 3 problems from the FRONT of New Queue, remove from New Queue, append to BACK of Revision Queue.
     * STEP 3: Append today's revised problems (from STEP 1) to the BACK of Revision Queue.
     */
    async completeTodaysRevision(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (!user.newQueue) user.newQueue = [];
        if (!user.revisionQueue) user.revisionQueue = [];

        if (user.revisionQueue.length === 0 && user.newQueue.length === 0) {
            return [];
        }

        // STEP 1: Take up to 3 problems from the FRONT of Revision Queue
        const revCount = Math.min(3, user.revisionQueue.length);
        const todaysRevised = user.revisionQueue.splice(0, revCount);

        // STEP 2: Take up to 3 problems from the FRONT of New Queue
        const newCount = Math.min(3, user.newQueue.length);
        const movedFromNew = user.newQueue.splice(0, newCount);
        
        // Append moved new problems to BACK of Revision Queue
        user.revisionQueue.push(...movedFromNew);

        // STEP 3: Append today's revised problems to BACK of Revision Queue
        user.revisionQueue.push(...todaysRevised);

        // Save updated queues
        await user.save();

        // Determine which problems are emailed today
        // Emailed items = today's revised items, supplemented by moved new items if revised < 3
        const emailedIds = [...todaysRevised];
        if (emailedIds.length < 3) {
            const needed = 3 - emailedIds.length;
            emailedIds.push(...movedFromNew.slice(0, needed));
        }

        // Populate and return emailed problem objects
        const populatedUser = await User.findById(userId).populate({
            path: 'revisionQueue',
            match: { _id: { $in: emailedIds } }
        });

        // Map in order of emailedIds
        const problemMap = new Map();
        if (populatedUser && populatedUser.revisionQueue) {
            populatedUser.revisionQueue.forEach(p => {
                if (p) problemMap.set(p._id.toString(), p);
            });
        }

        const emailedProblems = emailedIds
            .map(id => problemMap.get(id.toString()))
            .filter(p => p !== undefined && p !== null);

        return emailedProblems;
    }
}

module.exports = new RevisionService();

