const User = require('../models/user.model');

class RevisionRepository {
    async getRevisionQueue(userId) {
        // Find the user and populate the problem details in the revision queue
        const user = await User.findById(userId).populate('revisionQueue');
        return user ? user.revisionQueue : null;
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
