import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export interface User extends Document {
    username: string
    fullName: string
    email: string
    avatar: string
    coverImage: string
    watchHistory: string[],
    password: string
    refeshToken: string
}

const userSchema: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    avatar: {
        type: String, // cloudinary url
        required: true
    },
    coverImage: {
        type: String // cloudinary url
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }],
    password: {
        type: String,
        required: [true, "Password is required "]
    },
    refeshToken: {
        type: String
    }

}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// my own method to check passowrd 
userSchema.methods.isPasswordCorrected = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generatedAccessToken = function () {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SCRECT || "",
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPERIY
        }
    )
}

userSchema.methods.generatedRefreshToken = function () {
    return jwt.sign(
        {
            id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET || "",
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPERIY
        }
    )
}

export const User =  mongoose.models.User || mongoose.model("User", userSchema);