// components/Resume/ResumeCard.js
import { useState } from "react"
import { Eye, Edit, Trash2, Download, Share, MoreVertical } from "lucide-react"

export default function ResumeCard({ resume, onDelete, onEdit, onView }) {
	const [showMenu, setShowMenu] = useState(false)

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString("th-TH")
	}

	const handleDownloadPDF = async () => {
		try {
			const response = await fetch(`/api/resumes/${resume._id}/pdf`)
			if (response.ok) {
				const blob = await response.blob()
				const url = window.URL.createObjectURL(blob)
				const a = document.createElement("a")
				a.href = url
				a.download = `${resume.title}.pdf`
				a.click()
				window.URL.revokeObjectURL(url)
			}
		} catch (error) {
			console.error("Failed to download PDF:", error)
		}
	}

	return (
		<div className="bg-white rounded-lg shadow border hover:shadow-lg transition-shadow">
			<div className="p-6">
				<div className="flex justify-between items-start mb-3">
					<h3 className="text-lg font-semibold text-gray-900 truncate">
						{resume.title}
					</h3>
					<div className="relative">
						<button
							onClick={() => setShowMenu(!showMenu)}
							className="p-1 text-gray-400 hover:text-gray-600"
						>
							<MoreVertical className="w-5 h-5" />
						</button>

						{showMenu && (
							<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-10">
								<div className="py-1">
									<button
										onClick={() => {
											onView()
											setShowMenu(false)
										}}
										className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									>
										<Eye className="w-4 h-4 mr-2" />
										ดู Resume
									</button>
									<button
										onClick={() => {
											onEdit()
											setShowMenu(false)
										}}
										className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									>
										<Edit className="w-4 h-4 mr-2" />
										แก้ไข
									</button>
									<button
										onClick={() => {
											handleDownloadPDF()
											setShowMenu(false)
										}}
										className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									>
										<Download className="w-4 h-4 mr-2" />
										ดาวน์โหลด PDF
									</button>
									<button
										onClick={() => {
											onDelete()
											setShowMenu(false)
										}}
										className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
									>
										<Trash2 className="w-4 h-4 mr-2" />
										ลบ
									</button>
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="text-sm text-gray-600 mb-3">
					<p>สร้างเมื่อ: {formatDate(resume.createdAt)}</p>
					<p>อัปเดตล่าสุด: {formatDate(resume.updatedAt)}</p>
				</div>

				{/* Tags */}
				{resume.tags && resume.tags.length > 0 && (
					<div className="flex flex-wrap gap-2 mb-3">
						{resume.tags.slice(0, 3).map((tag, index) => (
							<span
								key={index}
								className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
							>
								{tag}
							</span>
						))}
						{resume.tags.length > 3 && (
							<span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
								+{resume.tags.length - 3} อื่นๆ
							</span>
						)}
					</div>
				)}

				{/* Status */}
				<div className="flex justify-between items-center">
					<span
						className={`px-3 py-1 rounded-full text-xs font-medium ${
							resume.isPublic
								? "bg-green-100 text-green-800"
								: "bg-yellow-100 text-yellow-800"
						}`}
					>
						{resume.isPublic ? "สาธารณะ" : "ร่าง"}
					</span>

					<div className="flex space-x-2">
						<button
							onClick={onView}
							className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full"
							title="ดู Resume"
						>
							<Eye className="w-4 h-4" />
						</button>
						<button
							onClick={onEdit}
							className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full"
							title="แก้ไข"
						>
							<Edit className="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
