// pages/api/resumes/index.js
import dbConnect from "../../../lib/db"
import Resume from "../../../models/Resume"
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
	await dbConnect()
	const session = await getSession({ req })

	if (!session) {
		return res.status(401).json({ error: "Unauthorized" })
	}

	switch (req.method) {
		case "GET":
			try {
				const resumes = await Resume.find({
					userId: session.user.id,
				}).sort({ updatedAt: -1 })
				res.status(200).json(resumes)
			} catch (error) {
				res.status(500).json({ error: "Failed to fetch resumes" })
			}
			break

		case "POST":
			try {
				const resumeData = {
					...req.body,
					userId: session.user.id,
					updatedAt: new Date(),
				}
				const resume = new Resume(resumeData)
				await resume.save()
				res.status(201).json(resume)
			} catch (error) {
				res.status(500).json({ error: "Failed to create resume" })
			}
			break

		default:
			res.setHeader("Allow", ["GET", "POST"])
			res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
