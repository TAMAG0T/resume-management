// components/Layout/Layout.js
import { useState } from "react"
import { Analytics } from "@vercel/analytics/next"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Home, FileText, User, Settings, LogOut, Menu, X } from "lucide-react"


export default function Layout({ children }) {
	const { data: session } = useSession()
	const router = useRouter()
	const [sidebarOpen, setSidebarOpen] = useState(false)

	const navigation = [
		{ name: "Dashboard", href: "/dashboard", icon: Home },
		{ name: "Resume ของฉัน", href: "/resumes", icon: FileText },
		{ name: "โปรไฟล์", href: "/profile", icon: User },
		{ name: "การตั้งค่า", href: "/settings", icon: Settings },
	]

	return (
		
		<div className="min-h-screen bg-gray-50">
			{/* Mobile sidebar backdrop */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div
				className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
			>
				<div className="flex items-center justify-between h-16 px-6 border-b">
					<h1 className="text-xl font-bold text-gray-900">
						Resume Manager
					</h1>
					<button
						onClick={() => setSidebarOpen(false)}
						className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				<nav className="mt-6">
					{navigation.map((item) => {
						const Icon = item.icon
						const isActive =
							router.pathname === item.href ||
							router.pathname.startsWith(item.href)

						return (
							<Link
								key={item.name}
								href={item.href}
								className={`
                  flex items-center px-6 py-3 text-sm font-medium transition-colors
                  ${
						isActive
							? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
							: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
					}
                `}
							>
								<Icon className="w-5 h-5 mr-3" />
								{item.name}
							</Link>
						)
					})}
				</nav>

				{/* User info */}
				{session && (
					<div className="absolute bottom-0 left-0 right-0 p-6 border-t">
						<div className="flex items-center mb-3">
							<div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
								{session.user.firstName?.[0] ||
									session.user.email[0].toUpperCase()}
							</div>
							<div className="ml-3">
								<p className="text-sm font-medium text-gray-900">
									{session.user.firstName}{" "}
									{session.user.lastName}
								</p>
								<p className="text-xs text-gray-500">
									{session.user.email}
								</p>
							</div>
						</div>
						<button
							onClick={() => signOut()}
							className="flex items-center w-full px-3 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors"
						>
							<LogOut className="w-4 h-4 mr-2" />
							ออกจากระบบ
						</button>
					</div>
				)}
			</div>

			{/* Main content */}
			<div className="lg:pl-64">
				{/* Top bar */}
				<div className="h-16 bg-white shadow-sm border-b flex items-center px-6">
					<button
						onClick={() => setSidebarOpen(true)}
						className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
					>
						<Menu className="w-5 h-5" />
					</button>

					<div className="flex-1 flex justify-between items-center lg:ml-0 ml-4">
						<h2 className="text-lg font-semibold text-gray-900">
							{getPageTitle(router.pathname)}
						</h2>

						{session && (
							<div className="flex items-center space-x-4">
								<span className="text-sm text-gray-600">
									สวัสดี, {session.user.firstName}
								</span>
							</div>
						)}
					</div>
				</div>

				{/* Page content */}
				<main className="p-6">{children}</main>
			</div>
		</div>
	)
}

function getPageTitle(pathname) {
	const titles = {
		"/dashboard": "Dashboard",
		"/resumes": "Resume ของฉัน",
		"/resumes/create": "สร้าง Resume ใหม่",
		"/profile": "โปรไฟล์",
		"/settings": "การตั้งค่า",
	}

	if (pathname.includes("/resumes/edit/")) return "แก้ไข Resume"
	if (pathname.includes("/resumes/view/")) return "ดู Resume"

	return titles[pathname] || "Resume Management"
}
