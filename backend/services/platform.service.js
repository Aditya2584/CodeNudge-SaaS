const userRepository = require('../repositories/user.repository');
const ApiError = require('../utils/ApiError');

class PlatformService {
    async getLeetcodeUsername(userId) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        return user.leetcodeUsername;
    }

    async updateLeetcodeUsername(userId, leetcodeUsername) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const updatedUser = await userRepository.updateById(userId, { leetcodeUsername });
        return updatedUser.leetcodeUsername;
    }
}

module.exports = new PlatformService();
