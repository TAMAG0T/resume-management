// pages/api/resumes/[id].js
import dbConnect from "../../../lib/db"
import Resume from "../../../models/Resume"
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
	const { id } = req.query
	await dbConnect()
	const session = await getSession({ req })

	if (!session) {
		return res.status(401).json({ error: "Unauthorized" })
	}

	switch (req.method) {
		case "GET":
			try {
				const resume = await Resume.findOne({
					_id: id,
					userId: session.user.id,
				})
				if (!resume) {
					return res.status(404).json({ error: "Resume not found" })
				}
				res.status(200).json(resume)
			} catch (error) {
				res.status(500).json({ error: "Failed to fetch resume" })
			}
			break

		case "PUT":
			try {
				const resume = await Resume.findOneAndUpdate(
					{ _id: id, userId: session.user.id },
					{ ...req.body, updatedAt: new Date() },
					{ new: true }
				)
				if (!resume) {
					return res.status(404).json({ error: "Resume not found" })
				}
				res.status(200).json(resume)
			} catch (error) {
				res.status(500).json({ error: "Failed to update resume" })
			}
			break

		case "DELETE":
			try {
				const resume = await Resume.findOneAndDelete({
					_id: id,
					userId: session.user.id,
				})
				if (!resume) {
					return res.status(404).json({ error: "Resume not found" })
				}
				res.status(200).json({ message: "Resume deleted successfully" })
			} catch (error) {
				res.status(500).json({ error: "Failed to delete resume" })
			}
			break

		default:
			res.setHeader("Allow", ["GET", "PUT", "DELETE"])
			res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
