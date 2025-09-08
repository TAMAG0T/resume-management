// pages/auth/register.js
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Chrome } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Register() {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const [acceptTerms, setAcceptTerms] = useState(false);

	const router = useRouter();
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/dashboard');
		}
	}, [status, router]);

	const validateForm = () => {
		const newErrors = {};

		if (!formData.firstName.trim()) {
			newErrors.firstName = 'กรุณากรอกชื่อ';
		}

		if (!formData.lastName.trim()) {
			newErrors.lastName = 'กรุณากรอกนามสกุล';
		}

		if (!formData.email) {
			newErrors.email = 'กรุณากรอกอีเมล';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
		}

		if (!formData.password) {
			newErrors.password = 'กรุณากรอกรหัสผ่าน';
		} else if (formData.password.length < 8) {
			newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร';
		} else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
			newErrors.password = 'รหัสผ่านต้องประกอบด้วยตัวอักษรและตัวเลข';
		}

		if (!formData.confirmPassword) {
			newErrors.confirmPassword = 'กรุณายืนยันรหัสผ่าน';
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
		}

		if (!acceptTerms) {
			newErrors.terms = 'กรุณายอมรับข้อตกลงการใช้งาน';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setLoading(true);

		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (response.ok) {
				toast.success('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
				router.push('/auth/login');
			} else {
				toast.error(data.error || 'เกิดข้อผิดพลาด');
			}
		} catch (error) {
			console.error('Registration error:', error);
			toast.error('เกิดข้อผิดพลาดในระบบ');
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		})); 

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors(prev => ({
				...prev,
				[name]: ''
			}));
		}
	};

	if (status === 'loading') {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				{/* Header */}
				<div className="text-center">
					<div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
						<span className="text-white text-2xl font-bold">R</span>
					</div>
					<h2 className="text-3xl font-bold text-gray-900 mb-2">
						สมัครสมาชิก
					</h2>
					<p className="text-gray-600">
						เริ่มต้นสร้าง Resume ที่สมบูรณ์แบบ
					</p>
				</div>

				{/* Register Form */}
				<div className="bg-white py-8 px-6 shadow-xl rounded-lg border">
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Name Fields */}
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="firstName"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									ชื่อ
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<User className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="firstName"
										name="firstName"
										type="text"
										value={formData.firstName}
										onChange={handleInputChange}
										className={`w-full pl-10 pr-3 py-3 border ${
											errors.firstName
												? "border-red-300"
												: "border-gray-300"
										} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
										placeholder="ชื่อ"
									/>
								</div>
								{errors.firstName && (
									<p className="mt-1 text-sm text-red-600">
										{errors.firstName}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="lastName"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									นามสกุล
								</label>
								<input
									id="lastName"
									name="lastName"
									type="text"
									value={formData.lastName}
									onChange={handleInputChange}
									className={`w-full px-3 py-3 border ${
										errors.lastName
											? "border-red-300"
											: "border-gray-300"
									} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
									placeholder="นามสกุล"
								/>
								{errors.lastName && (
									<p className="mt-1 text-sm text-red-600">
										{errors.lastName}
									</p>
								)}
							</div>
						</div>

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
									className={`w-full pl-10 pr-3 py-3 border ${
										errors.email
											? "border-red-300"
											: "border-gray-300"
									} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
									placeholder="กรอกอีเมลของคุณ"
								/>
							</div>
							{errors.email && (
								<p className="mt-2 text-sm text-red-600">
									{errors.email}
								</p>
							)}
						</div>

						{/* Password Input */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								รหัสผ่าน
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									value={formData.password}
									onChange={handleInputChange}
									className={`w-full pl-10 pr-10 py-3 border ${
										errors.password
											? "border-red-300"
											: "border-gray-300"
									} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
									placeholder="กรอกรหัสผ่าน (8+ ตัวอักษร)"
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
						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								ยืนยันรหัสผ่าน
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="confirmPassword"
									name="confirmPassword"
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
									value={formData.confirmPassword}
									onChange={handleInputChange}
									className={`w-full pl-10 pr-10 py-3 border ${
										errors.confirmPassword
											? "border-red-300"
											: "border-gray-300"
									} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
									placeholder="กรอกรหัสผ่านยืนยัน"
								/>
								<button
									type="button"
									onClick={() =>
										setShowConfirmPassword(
											!showConfirmPassword
										)
									}
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
								>
									{showConfirmPassword ? (
										<EyeOff className="h-5 w-5 text-gray-400" />
									) : (
										<Eye className="h-5 w-5 text-gray-400" />
									)}
								</button>
							</div>
						</div>
						<div className="">
							<button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
								ตกลง
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)

}