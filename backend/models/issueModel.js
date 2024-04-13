import mongoose from "mongoose";

const issueSchema = mongoose.Schema(
    {
        status: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        severity: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        notes: {
            type: Array,
            required: false,
        }
    }, 
    {
        timestamps: true // Automatically add createdAt and updatedAt fields
    }
);

export const Issue = mongoose.model('Issue', issueSchema);;