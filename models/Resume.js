// models/Resume.js
import mongoose from "mongoose"

const resumeSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	personalInfo: {
		firstName: String,
		lastName: String,
		email: String,
		phone: String,
		address: String,
		linkedin: String,
		website: String,
		summary: String,
	},
	experience: [
		{
			company: String,
			position: String,
			startDate: Date,
			endDate: Date,
			current: Boolean,
			description: String,
			achievements: [String],
		},
	],
	education: [
		{
			institution: String,
			degree: String,
			field: String,
			startDate: Date,
			endDate: Date,
			gpa: String,
			description: String,
		},
	],
	skills: [
		{
			category: String,
			items: [String],
		},
	],
	projects: [
		{
			name: String,
			description: String,
			technologies: [String],
			link: String,
			github: String,
		},
	],
	certifications: [
		{
			name: String,
			issuer: String,
			date: Date,
			link: String,
		},
	],
	languages: [
		{
			language: String,
			proficiency: String,
		},
	],
	template: {
		type: String,
		default: "modern",
	},
	fileUrl: String,
	isPublic: {
		type: Boolean,
		default: false,
	},
	tags: [String],
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
})

export default mongoose.models.Resume || mongoose.model("Resume", resumeSchema)
