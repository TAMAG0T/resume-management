// pages/auth/login.js
import { useState, useEffect } from "react"
import { signIn, getSession, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, Chrome, KeyRound } from "lucide-react"
import { toast } from "react-hot-toast"

export default function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({})
	

	const router = useRouter()
	const { data: session, status } = useSession()

	useEffect(() => {
		if (status === "authenticated") {
			router.push("/dashboard")
		}
	}, [status, router])

	const validateForm = () => {
		const newErrors = {}

		if (!formData.email) {
			newErrors.email = "กรุณากรอกอีเมล"
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง"
		}

		if (!formData.password) {
			newErrors.password = "กรุณากรอกรหัสผ่าน"
		} else if (formData.password.length < 6) {
			newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!validateForm()) {
			return
		}

		setLoading(true)

		try {
			const result = await signIn("credentials", {
				email: formData.email,
				password: formData.password,
				redirect: false,
			})

			if (result?.error) {
				toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง")
			} else if (result?.ok) {
				toast.success("เข้าสู่ระบบสำเร็จ")
				router.push("/dashboard")
			}
		} catch (error) {
			console.error("Login error:", error)
			toast.error("เกิดข้อผิดพลาดในระบบ")
		} finally {
			setLoading(false)
		}
	}

	const handleGoogleSignIn = async () => {
		try {
			setLoading(true)
			await signIn("google", { callbackUrl: "/dashboard" })
		} catch (error) {
			console.error("Google sign in error:", error)
			toast.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ")
			setLoading(false)
		}
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}))
		}
	}

	if (status === "loading") {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			</div>
		)
	}

	return (
		// <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
		<div className="min-h-screen bg-sky-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				{/* Header */}
				<div className="text-center">
					<div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
						<span className="text-white text-2xl font-bold">R</span>
					</div>
					<h2 className="text-3xl font-bold text-gray-900 mb-2">
						เข้าสู่ระบบ
					</h2>
					<p className="text-gray-600">
						เข้าสู่ระบบจัดการ Resume ของคุณ
					</p>
				</div>

				{/* Login Form */}
				<div className="bg-white py-8 px-6 shadow-xl rounded-lg border">
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Email Input */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								อีเมล
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="email"
									name="email"
									type="email"
									value={formData.email}
									onChange={handleInputChange}
									className={`appearance-none relative block w-full pl-10 pr-3 py-3 mb-3 border ${
										errors.email
											? "border-red-300"
											: "border-gray-300"
									} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
									placeholder="ยืนยันรหัสผ่านใหม่"
								/>
							</div>
							{errors.confirmPassword && (
								<p className="mt-2 text-sm text-red-600">
									{errors.confirmPassword}
								</p>
							)}
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								รหัสผ่าน
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<KeyRound className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="password"
									name="password"
									type={!showPassword ? "password":"text"}
									value={formData.password}
									onChange={handleInputChange}
									className={`appearance-none relative block w-full pl-10 pr-3 py-3 border placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
									placeholder="รหัสผ่าน"
								/>
								<button
									type="button"
									onClick={() =>
										setShowPassword(!showPassword)
									}
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
								>
									{showPassword ? (
										<EyeOff className="h-5 w-5 text-gray-400" />
									) : (
										<Eye className="h-5 w-5 text-gray-400" />
									)}
								</button>
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							{loading ? (
								<div className="flex items-center">
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
									กำลังบันทึก...
								</div>
							) : (
								"รีเซ็ตรหัสผ่าน"
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
