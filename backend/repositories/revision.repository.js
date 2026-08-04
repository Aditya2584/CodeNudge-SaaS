const User = require('../models/user.model');

class RevisionRepository {
    async getRevisionQueue(userId) {
        // Find the user and populate the problem details in the revision queue
        const user = await User.findById(userId).populate('revisionQueue');
        return user ? user.revisionQueue : null;
    }

    async getUserQueues(userId) {
        // Find user and populate both newQueue and revisionQueue
        const user = await User.findById(userId)
            .populate('newQueue')
            .populate('revisionQueue');
        return user;
    }

    async updateQueues(userId, newQueueIds, revisionQueueIds) {
        // Update both newQueue and revisionQueue arrays of ObjectIds
        const user = await User.findByIdAndUpdate(
            userId,
            { 
                newQueue: newQueueIds,
                revisionQueue: revisionQueueIds 
            },
            { new: true }
        ).populate('newQueue').populate('revisionQueue');
        
        return user;
    }

    async updateRevisionQueue(userId, queueIds) {
        // Find the user and update the revisionQueue array of ObjectIds
        const user = await User.findByIdAndUpdate(
            userId,
            { revisionQueue: queueIds },
            { new: true } // return updated document
        ).populate('revisionQueue');
        
        return user ? user.revisionQueue : null;
    }
}

module.exports = new RevisionRepository();

