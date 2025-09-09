import dbConnect from "@/lib/db"
import mongoose from "mongoose"

export default async function handler(req, res) {
	try {
		// 1. เชื่อมต่อฐานข้อมูล
		await dbConnect()

		// 2. ตรวจสอบสถานะการเชื่อมต่อ
		const connectionState = mongoose.connection.readyState
		const isConnected = connectionState === 1 // 1 หมายถึง 'connected'

		if (isConnected) {
			res.status(200).json({
				message: "Database connection successful (Mongoose)",
				readyState: connectionState, // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
			})
		} else {
			throw new Error("Database not connected")
		}
	} catch (error) {
		console.error("Database connection failed:", error)
		res.status(500).json({ message: "Database connection failed", error: error.message })
	}
}