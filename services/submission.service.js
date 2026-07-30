const submissionRepository = require('../repositories/submission.repository');
const ApiError = require('../utils/ApiError');

class SubmissionService {
    async handleSubmission(userId, payload) {
        const { platform, title, titleSlug, difficulty, submittedAt } = payload;

        console.log(`[Submission] Request received for ${titleSlug}`);

        // 1. Check if user already has this platform + titleSlug
        const existingProblem = await submissionRepository.findByUserAndPlatformAndSlug(
            userId, 
            platform, 
            titleSlug
        );

        if (existingProblem) {
            // If YES, Ignore it (return cleanly so extension knows it was processed)
            console.log(`[Submission] Duplicate submission ignored for ${titleSlug}`);
            return {
                status: 'ignored',
                message: 'Duplicate submission ignored.'
            };
        }

        let newProblem;
        try {
            console.log(`[Submission] Creating submission for ${titleSlug}`);
            // 2. If NO, create a new problem. Never create duplicate records.
            newProblem = await submissionRepository.createProblem({
                user: userId,
                platform,
                title,
                titleSlug,
                difficulty: difficulty || 'Unknown',
                submittedAt: new Date(submittedAt)
            });
            console.log(`[Submission] Submission saved: ${titleSlug}`);
        } catch (error) {
            // Check for MongoDB Duplicate Key Error (E11000) from concurrent race conditions
            if (error.code === 11000) {
                console.log(`[Submission] Concurrent Duplicate Submission Ignored: ${titleSlug}`);
                return {
                    status: 'ignored',
                    message: 'Concurrent duplicate submission ignored.'
                };
            }
            throw error; // Rethrow other unexpected errors
        }

        try {
            console.log(`[Submission] Updating revision queue for ${titleSlug}`);
            const revisionService = require('./revision.service');
            await revisionService.enqueueProblem(userId, newProblem._id);
            console.log(`[Submission] Revision queue updated for ${titleSlug}`);
        } catch (error) {
            console.error(`[Submission] Error updating revision queue for ${titleSlug}:`, error);
            
            // ROLLBACK: Delete the problem that was just created to maintain database consistency
            console.log(`[Submission] Rolling back submission creation for ${titleSlug}`);
            await submissionRepository.deleteProblemById(newProblem._id);
            console.log(`[Submission] Rollback completed for ${titleSlug}`);
            
            // Re-throw the error so the API returns a proper 500 error, not a false success.
            throw error;
        }

        console.log(`[Submission] Returning response for ${titleSlug}`);
        return {
            status: 'created',
            message: 'Submission synchronized successfully.'
        };
    }
}

module.exports = new SubmissionService();
