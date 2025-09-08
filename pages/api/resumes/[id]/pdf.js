// pages/api/resumes/[id]/pdf.js
import dbConnect from "../../../../lib/db"
import Resume from "../../../../models/Resume"
import { getSession } from "next-auth/react"
import jsPDF from "jspdf"

export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" })
	}

	const { id } = req.query
	const session = await getSession({ req })

	if (!session) {
		return res.status(401).json({ error: "Unauthorized" })
	}

	try {
		await dbConnect()
		const resume = await Resume.findOne({
			_id: id,
			$or: [{ userId: session.user.id }, { isPublic: true }],
		})

		if (!resume) {
			return res.status(404).json({ error: "Resume not found" })
		}

		// Generate PDF
		const pdf = new jsPDF()

		// Add content to PDF
		pdf.setFontSize(20)
		pdf.text(resume.title, 20, 30)

		pdf.setFontSize(16)
		pdf.text(
			`${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`,
			20,
			50
		)

		pdf.setFontSize(12)
		if (resume.personalInfo.email) {
			pdf.text(`Email: ${resume.personalInfo.email}`, 20, 70)
		}
		if (resume.personalInfo.phone) {
			pdf.text(`Phone: ${resume.personalInfo.phone}`, 20, 85)
		}

		// Add experience section
		if (resume.experience && resume.experience.length > 0) {
			pdf.setFontSize(14)
			pdf.text("ประสบการณ์การทำงาน", 20, 110)

			let yPosition = 125
			resume.experience.forEach((exp, index) => {
				if (yPosition > 250) {
					pdf.addPage()
					yPosition = 30
				}

				pdf.setFontSize(12)
				pdf.text(`${exp.position} - ${exp.company}`, 20, yPosition)
				yPosition += 15

				if (exp.description) {
					const lines = pdf.splitTextToSize(exp.description, 170)
					pdf.text(lines, 20, yPosition)
					yPosition += lines.length * 5 + 10
				}
			})
		}

		const pdfBuffer = pdf.output("arraybuffer")

		res.setHeader("Content-Type", "application/pdf")
		res.setHeader(
			"Content-Disposition",
			`attachment; filename="${resume.title}.pdf"`
		)
		res.send(Buffer.from(pdfBuffer))
	} catch (error) {
		console.error("PDF generation error:", error)
		res.status(500).json({ error: "Failed to generate PDF" })
	}
}
