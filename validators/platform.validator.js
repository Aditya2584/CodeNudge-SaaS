const { z } = require('zod');

const updatePlatformSchema = z.object({
    leetcodeUsername: z.string()
        .trim()
        .min(3, "LeetCode username must be at least 3 characters")
        .max(50, "LeetCode username must be less than 50 characters"),
});

module.exports = {
    updatePlatformSchema,
};
