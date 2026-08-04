const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        leetcodeUsername: {
            type: String,
            trim: true,
            default: null,
        },
        lastSyncDate: {
            type: Date,
            default: null,
        },
        newQueue: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Problem'
            }
        ],
        revisionQueue: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Problem'
            }
        ]
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
    // next(); 
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

const User = mongoose.model("User", userSchema);
module.exports = User;
