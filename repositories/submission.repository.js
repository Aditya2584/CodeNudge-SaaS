const Problem = require('../models/problem.model');

class SubmissionRepository {
    async findByUserAndPlatformAndSlug(userId, platform, titleSlug) {
        return await Problem.findOne({ user: userId, platform, titleSlug });
    }

    async createProblem(problemData) {
        return await Problem.create(problemData);
    }

    async bulkCreateProblems(problemsArray) {
        if (!problemsArray || problemsArray.length === 0) return [];
        return await Problem.insertMany(problemsArray, { ordered: false });
    }

    async getProblemsByUser(userId) {
        return await Problem.find({ user: userId });
    }

    async deleteProblemById(problemId) {
        return await Problem.findByIdAndDelete(problemId);
    }
}

module.exports = new SubmissionRepository();
