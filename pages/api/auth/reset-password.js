// pages/api/auth/reset-password.js
import crypto from "crypto"
import bcrypt from "bcryptjs"
import dbConnect from "../../../lib/db"
import User from "../../../models/User"

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" })
	}

	try {
		await dbConnect()

		const { token, password } = req.body

		if (!token || !password) {
			return res.status(400).json({ error: "ข้อมูลไม่ครบถ้วน" })
		}

		if (password.length < 8) {
			return res
				.status(400)
				.json({ error: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" })
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

		// Hash new password
		const saltRounds = 12
		const hashedPassword = bcrypt.hashSync(password, saltRounds)

		// Update user password and clear reset token
		user.password = hashedPassword
		user.passwordResetToken = undefined
		user.passwordResetExpires = undefined
		await user.save()

		res.status(200).json({ message: "รีเซ็ตรหัสผ่านสำเร็จ" })
	} catch (error) {
		console.error("Reset password error:", error)
		res.status(500).json({ error: "เกิดข้อผิดพลาดในระบบ" })
	}
}
