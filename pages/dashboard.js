// pages/dashboard.js
import { useState, useEffect } from "react"
import { useSession, getSession } from "next-auth/react"
import { useRouter } from "next/router"
import Layout from "../components/Layout/Layout"
import ResumeCard from "../components/Resume/ResumeCard"
import { Plus, Search, Filter } from "lucide-react"

export default function Dashboard() {
	const { data: session, status } = useSession()
	const router = useRouter()
	const [resumes, setResumes] = useState([])
	const [filteredResumes, setFilteredResumes] = useState([])
	const [searchTerm, setSearchTerm] = useState("")
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/login")
		}
	}, [status])

	useEffect(() => {
		fetchResumes()
	}, [])

	useEffect(() => {
		if (searchTerm) {
			const filtered = resumes.filter(
				(resume) =>
					resume.title
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					resume.tags.some((tag) =>
						tag.toLowerCase().includes(searchTerm.toLowerCase())
					)
			)
			setFilteredResumes(filtered)
		} else {
			setFilteredResumes(resumes)
		}
	}, [searchTerm, resumes])

	const fetchResumes = async () => {
		try {
			const response = await fetch("/api/resumes")
			if (response.ok) {
				const data = await response.json()
				setResumes(data)
				setFilteredResumes(data)
			}
		} catch (error) {
			console.error("Failed to fetch resumes:", error)
		} finally {
			setLoading(false)
		}
	}

	const handleDeleteResume = async (id) => {
		if (confirm("คุณแน่ใจหรือไม่ที่จะลบ Resume นี้?")) {
			try {
				const response = await fetch(`/api/resumes/${id}`, {
					method: "DELETE",
				})
				if (response.ok) {
					fetchResumes()
				}
			} catch (error) {
				console.error("Failed to delete resume:", error)
			}
		}
	}

	if (status === "loading" || loading) {
		return (
			<Layout>
				<div className="flex justify-center items-center h-64">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
				</div>
			</Layout>
		)
	}

	return (
		<Layout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold text-gray-900">
						จัดการ Resume ของคุณ
					</h1>
					<button
						onClick={() => router.push("/resumes/create")}
						className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						<Plus className="w-5 h-5 mr-2" />
						สร้าง Resume ใหม่
					</button>
				</div>

				{/* Search and Filter */}
				<div className="flex space-x-4">
					<div className="flex-1 relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
						<input
							type="text"
							placeholder="ค้นหา Resume..."
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
						<Filter className="w-5 h-5 mr-2" />
						กรอง
					</button>
				</div>

				{/* Resume Grid */}
				{filteredResumes.length === 0 ? (
					<div className="text-center py-12">
						<div className="text-gray-500 text-lg mb-4">
							{searchTerm
								? "ไม่พบ Resume ที่ค้นหา"
								: "คุณยังไม่มี Resume"}
						</div>
						{!searchTerm && (
							<button
								onClick={() => router.push("/resumes/create")}
								className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
							>
								สร้าง Resume แรกของคุณ
							</button>
						)}
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredResumes.map((resume) => (
							<ResumeCard
								key={resume._id}
								resume={resume}
								onDelete={() => handleDeleteResume(resume._id)}
								onEdit={() =>
									router.push(`/resumes/edit/${resume._id}`)
								}
								onView={() =>
									router.push(`/resumes/view/${resume._id}`)
								}
							/>
						))}
					</div>
				)}

				{/* Statistics */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
					<div className="bg-white p-6 rounded-lg shadow border">
						<h3 className="text-lg font-semibold text-gray-900">
							Total Resumes
						</h3>
						<p className="text-3xl font-bold text-blue-600">
							{resumes.length}
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow border">
						<h3 className="text-lg font-semibold text-gray-900">
							Public Resumes
						</h3>
						<p className="text-3xl font-bold text-green-600">
							{resumes.filter((r) => r.isPublic).length}
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow border">
						<h3 className="text-lg font-semibold text-gray-900">
							Draft Resumes
						</h3>
						<p className="text-3xl font-bold text-yellow-600">
							{resumes.filter((r) => !r.isPublic).length}
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow border">
						<h3 className="text-lg font-semibold text-gray-900">
							This Month
						</h3>
						<p className="text-3xl font-bold text-purple-600">
							{
								resumes.filter(
									(r) =>
										new Date(r.createdAt).getMonth() ===
										new Date().getMonth()
								).length
							}
						</p>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export async function getServerSideProps(context) {
	const session = await getSession(context)

	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		}
	}

	return {
		props: { session },
	}
}
