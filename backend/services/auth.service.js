const userRepository = require('../repositories/user.repository');
const ApiError = require('../utils/ApiError');

class AuthService {
    async signup(userData) {
        const { name, email, password, leetcodeUsername } = userData;

        const existedUser = await userRepository.findByEmail(email);
        if (existedUser) {
            throw new ApiError(409, "User with email already exists");
        }

        const user = await userRepository.create({ name, email, password, leetcodeUsername });
        
        const createdUser = await userRepository.findById(user._id);
        return createdUser;
    }

    async signin(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new ApiError(404, "User does not exist");
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid user credentials");
        }

        const accessToken = user.generateAccessToken();

        const loggedInUser = await userRepository.findById(user._id);

        return {
            user: loggedInUser,
            accessToken
        };
    }
    async getCurrentUser(user) {
        return user;
    }

    async logout(user) {
        // Since we are only using Access Tokens, logout is handled by the frontend
        // by removing the token. We can just return success here.
        return true;
    }
}

module.exports = new AuthService();
