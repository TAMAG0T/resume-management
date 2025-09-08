// pages/auth/error.js
import { useRouter } from "next/router"
import Link from "next/link"
import { AlertTriangle, ArrowLeft } from "lucide-react"

const errorMessages = {
	Configuration: "มีปัญหาในการตั้งค่าระบบ",
	AccessDenied: "ไม่มีสิทธิ์เข้าถึง",
	Verification: "ลิงก์ยืนยันไม่ถูกต้องหรือหมดอายุ",
	Default: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
	CredentialsSignin: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
	EmailCreateAccount: "ไม่สามารถสร้างบัญชีด้วยอีเมลนี้ได้",
	OAuthAccountNotLinked: "บัญชีนี้ใช้วิธีเข้าสู่ระบบอื่น",
	SessionRequired: "กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ",
}

export default function AuthError() {
	const router = useRouter()
	const { error } = router.query

	const errorMessage = errorMessages[error] || errorMessages.Default

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center py-12 px-4">
			<div className="max-w-md w-full">
				<div className="bg-white py-8 px-6 shadow-xl rounded-lg border text-center">
					<div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
						<AlertTriangle className="h-8 w-8 text-red-600" />
					</div>

					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						เกิดข้อผิดพลาด
					</h2>

					<p className="text-gray-600 mb-6">{errorMessage}</p>

					<div className="space-y-3">
						<Link
							href="/auth/login"
							className="w-full inline-block py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
						>
							ลองใหม่
						</Link>

						<button
							onClick={() => router.back()}
							className="w-full inline-flex justify-center items-center py-3 px-4 text-center border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
						>
							<ArrowLeft className="h-4 w-4 mr-2" />
							กลับ
						</button>
					</div>

					{error && (
						<p className="mt-4 text-xs text-gray-400">
							Error Code: {error}
						</p>
					)}
				</div>
			</div>
		</div>
	)
}
