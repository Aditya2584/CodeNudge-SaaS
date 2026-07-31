const cron = require('node-cron');
const userRepository = require('../repositories/user.repository');
const revisionService = require('../services/revision.service');
const emailService = require('../services/email.service');

function startRevisionScheduler() {
    // Schedule for 8:00 PM every day
    cron.schedule('* * * * *', async () => {
        console.log('[Revision Job] Started daily revision job');
        try {
            const users = await userRepository.findAllUsers();

            for (const user of users) {
                try {
                    console.log(`[Revision Job] Processing user: ${user.email}`);

                    // Skip users with empty revisionQueue
                    if (!user.revisionQueue || user.revisionQueue.length === 0) {
                        console.log(`[Revision Job] Skipping ${user.email} - revisionQueue is empty`);
                        continue;
                    }

                    // Rotate the queue and get the questions
                    const questions = await revisionService.completeTodaysRevision(user._id);

                    if (questions && questions.length > 0) {
                        // Send the email
                        const emailResult = await emailService.sendRevisionEmail(user, questions);

                        if (emailResult.success) {
                            console.log(`[Revision Job] Processing user: ${user.email} - Questions: ${questions.length} - Email Sent: Success`);
                        } else {
                            console.log(`[Revision Job] Processing user: ${user.email} - Questions: ${questions.length} - Email Sent: Failure`);
                        }
                    } else {
                        console.log(`[Revision Job] Skipping ${user.email} - No questions retrieved after completeTodaysRevision`);
                    }

                } catch (userError) {
                    // Do NOT crash the scheduler if one user fails
                    console.error(`[Revision Job] Error processing user ${user.email}:`, userError);
                }
            }
        } catch (error) {
            console.error('[Revision Job] Failed to fetch users for revision job:', error);
        }
        console.log('[Revision Job] Finished daily revision job');
    });

    console.log('Daily revision scheduler initialized');
}

module.exports = {
    startRevisionScheduler
};
