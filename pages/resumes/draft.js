// pages/api/resumes/draft.js
import dbConnect from "@/lib/db"
import Resume from "@/models/Resume"
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
	await dbConnect()
	const session = await getSession({ req })
	
	if (!session) {
		return res.status(401).json({ error: "Unauthorized" })
	}

	if (req.method === "POST") {
		try {
			const { resumeId, data } = req.body

			if (!resumeId) {
				// Create a new draft if no resumeId is provided
				const newResume = new Resume({
					userId: session.user.id,
					title: data.title || "Untitled Resume",
					...data,
					isPublic: false, // Ensure it's saved as a draft
				})
				await newResume.save()
				return res.status(201).json(newResume)
			} else {
				// Update an existing draft
				const updatedResume = await Resume.findOneAndUpdate(
					{ _id: resumeId, userId: session.user.id },
					{ ...data, updatedAt: new Date(), isPublic: false }, // Ensure it remains a draft
					{ new: true, upsert: true } // Create if not found, return new doc
				)

				if (!updatedResume) {
					return res.status(404).json({ error: "Resume not found or unauthorized" })
				}
				return res.status(200).json(updatedResume)
			}
		} catch (error) {
			console.error("Failed to save draft:", error)
			return res.status(500).json({ error: "Failed to save draft" })
		}
	} else if (req.method === "GET") {
		try {
			const { resumeId } = req.query
			if (!resumeId) {
				return res.status(400).json({ error: "Resume ID is required" })
			}

			const resume = await Resume.findOne({
				_id: resumeId,
				userId: session.user.id,
				isPublic: false, // Only fetch drafts
			})

			if (!resume) {
				return res.status(404).json({ error: "Draft not found or unauthorized" })
			}
			return res.status(200).json(resume)
		} catch (error) {
			console.error("Failed to fetch draft:", error)
			return res.status(500).json({ error: "Failed to fetch draft" })
		}
	} else {
		res.setHeader("Allow", ["POST", "GET"])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
