import nodemailer from "nodemailer"

export async function POST(req) {
	const { to, from, subject, message } = await req.json()
	// ตั้งค่า transporter
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		secure: false, 
		auth: {
			user: process.env.EMAIL_USER, // จาก .env.local
			pass: process.env.EMAIL_PASS,
		},
	})

	try {
        let info = await transporter.sendMail({
			from: from,
			to: to,
			subject: subject,
			text: message,
		})

		return new Response(JSON.stringify({ success: true,message:info.messageId }), { status: 200 })
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		})
	}
}
