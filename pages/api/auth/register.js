// pages/api/auth/register.js
import bcrypt from "bcryptjs"
import dbConnect from "../../../lib/db"
import User from "../../../models/User"
import { validateEmail, validatePassword } from "../../../lib/validation"

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" })
	}

	try {
		await dbConnect()

		const { email, password, firstName, lastName, confirmPassword } =
			req.body

		// Validation
		if (
			!email ||
			!password ||
			!firstName ||
			!lastName ||
			!confirmPassword
		) {
			return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" })
		}

		if (!validateEmail(email)) {
			return res.status(400).json({ error: "รูปแบบอีเมลไม่ถูกต้อง" })
		}

		if (!validatePassword(password)) {
			return res.status(400).json({
				error: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร และประกอบด้วยตัวอักษรและตัวเลข",
			})
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "รหัสผ่านไม่ตรงกัน" })
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email: email.toLowerCase() })
		if (existingUser) {
			return res.status(400).json({ error: "อีเมลนี้ถูกใช้งานแล้ว" })
		}

		// Hash password
		const saltRounds = 12
		const hashedPassword = bcrypt.hashSync(password, saltRounds)

		// Create user
		const user = new User({
			email: email.toLowerCase(),
			password: hashedPassword,
			firstName: firstName.trim(),
			lastName: lastName.trim(),
			role: "user",
		})

		await user.save()

		// Return success (don't include password)
		const { password: _, ...userWithoutPassword } = user.toObject()

		res.status(201).json({
			message: "สมัครสมาชิกสำเร็จ",
			user: userWithoutPassword,
		})
	} catch (error) {
		console.error("Registration error:", error)
		res.status(500).json({ error: "เกิดข้อผิดพลาดในระบบ" })
	}
}
