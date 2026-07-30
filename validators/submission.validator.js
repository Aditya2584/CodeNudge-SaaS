const { z } = require('zod');

const createSubmissionSchema = z.object({
    platform: z.enum(['leetcode'], {
        errorMap: () => ({ message: "Platform must be one of: leetcode" })
    }),
    title: z.string().min(1, "Title is required"),
    titleSlug: z.string().min(1, "TitleSlug is required"),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
    submittedAt: z.string().datetime("submittedAt must be a valid ISO Date string")
});

module.exports = {
    createSubmissionSchema
};
