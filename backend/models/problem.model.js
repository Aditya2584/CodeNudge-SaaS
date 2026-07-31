const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        platform: {
            type: String,
            required: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        titleSlug: {
            type: String,
            required: true,
            trim: true,
        },
        difficulty: {
            type: String,
            trim: true,
            default: 'Unknown'
        },
        submittedAt: {
            type: Date,
            required: true,
        },
        revisionLevel: {
            type: Number,
            default: 0,
        },
        nextRevisionDate: {
            type: Date,
            default: null,
        },
        lastRevisionDate: {
            type: Date,
            default: null,
        }
    },
    {
        timestamps: true
    }
);

// Index to ensure we don't save duplicate problems for the same user on the same platform
problemSchema.index({ user: 1, platform: 1, titleSlug: 1 }, { unique: true });

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;
