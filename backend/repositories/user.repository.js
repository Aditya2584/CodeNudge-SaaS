const User = require('../models/user.model');

class UserRepository {
    async create(userData) {
        return await User.create(userData);
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async findById(id) {
        return await User.findById(id).select("-password");
    }

    async findAllUsers() {
        return await User.find({}).select("-password");
    }

    async updateById(id, updateData) {
        return await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password");
    }
}

module.exports = new UserRepository();
