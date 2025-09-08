// pages/api/auth/validate-reset-token.js
import crypto from "crypto"
import dbConnect from "../../../lib/db"
import User from "../../../models/User"

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" })
	}

	try {
		await dbConnect()

		const { token } = req.body

		if (!token) {
			return res.status(400).json({ error: "Token is required" })
		}

		// Hash the token to compare with stored hash
		const resetTokenHash = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex")

		// Find user with valid reset token
		const user = await User.findOne({
			passwordResetToken: resetTokenHash,
			passwordResetExpires: { $gt: Date.now() },
		})

		if (!user) {
			return res.status(400).json({ error: "ลิงก์ไม่ถูกต้องหรือหมดอายุ" })
		}

		res.status(200).json({ message: "Token valid" })
	} catch (error) {
		console.error("Validate token error:", error)
		res.status(500).json({ error: "เกิดข้อผิดพลาดในระบบ" })
	}
}
