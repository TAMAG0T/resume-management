// models/User.js (Updated)
import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: function () {
				// Password not required for OAuth users
				return !this.oauthProvider
			},
			minlength: 6,
		},
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		profileImage: {
			type: String,
			default: null,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		emailVerified: {
			type: Boolean,
			default: false,
		},
		emailVerificationToken: String,
		emailVerificationExpires: Date,
		passwordResetToken: String,
		passwordResetExpires: Date,
		oauthProvider: {
			type: String,
			enum: ["google", "github"],
			default: null,
		},
		oauthId: String,
		lastLogin: Date,
		isActive: {
			type: Boolean,
			default: true,
		},
		loginAttempts: {
			type: Number,
			default: 0,
		},
		lockUntil: Date,
		twoFactorEnabled: {
			type: Boolean,
			default: false,
		},
		twoFactorSecret: String,
		preferences: {
			language: {
				type: String,
				default: "th",
			},
			timezone: {
				type: String,
				default: "Asia/Bangkok",
			},
			notifications: {
				email: {
					type: Boolean,
					default: true,
				},
				marketing: {
					type: Boolean,
					default: false,
				},
			},
		},
	},
	{
		timestamps: true,
	}
)

// Indexes
userSchema.index({ email: 1 })
userSchema.index({ passwordResetToken: 1 })
userSchema.index({ emailVerificationToken: 1 })

// Virtual for account locked
userSchema.virtual("isLocked").get(function () {
	return !!(this.lockUntil && this.lockUntil > Date.now())
})

// Methods
userSchema.methods.incLoginAttempts = function () {
	// Max 5 attempts
	if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
		this.lockUntil = Date.now() + 2 * 60 * 60 * 1000 // Lock for 2 hours
	}
	this.loginAttempts += 1
	return this.save()
}

userSchema.methods.resetLoginAttempts = function () {
	this.loginAttempts = 0
	this.lockUntil = undefined
	return this.save()
}

export default mongoose.models.User || mongoose.model("User", userSchema)
