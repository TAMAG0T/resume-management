// components/Resume/ResumePreview.js
import { useState } from "react"

const templates = {
	modern: "Modern",
	classic: "Classic",
	minimal: "Minimal",
	creative: "Creative",
}

export default function ResumePreview({ resumeData, template = "modern" }) {
	const [selectedTemplate, setSelectedTemplate] = useState(template)

	const ModernTemplate = ({ data }) => (
		<div className="bg-white shadow-lg rounded-lg overflow-hidden">
			{/* Header */}
			<div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
				<h1 className="text-3xl font-bold">
					{data.personalInfo?.firstName} {data.personalInfo?.lastName}
				</h1>
				<p className="text-blue-100 mt-2">{data.personalInfo?.email}</p>
				<p className="text-blue-100">{data.personalInfo?.phone}</p>
			</div>

			<div className="p-6">
				{/* Summary */}
				{data.personalInfo?.summary && (
					<div className="mb-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
							เกี่ยวกับตัวเอง
						</h2>
						<p className="text-gray-700 leading-relaxed">
							{data.personalInfo.summary}
						</p>
					</div>
				)}

				{/* Experience */}
				{data.experience && data.experience.length > 0 && (
					<div className="mb-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
							ประสบการณ์การทำงาน
						</h2>
						{data.experience.map((exp, index) => (
							<div key={index} className="mb-4 last:mb-0">
								<div className="flex justify-between items-start mb-2">
									<div>
										<h3 className="font-semibold text-gray-900">
											{exp.position}
										</h3>
										<p className="text-blue-600 font-medium">
											{exp.company}
										</p>
									</div>
									<span className="text-sm text-gray-500">
										{exp.startDate &&
											new Date(
												exp.startDate
											).getFullYear()}{" "}
										-
										{exp.current
											? "ปัจจุบัน"
											: exp.endDate &&
											  new Date(
													exp.endDate
											  ).getFullYear()}
									</span>
								</div>
								{exp.description && (
									<p className="text-gray-700 text-sm leading-relaxed">
										{exp.description}
									</p>
								)}
							</div>
						))}
					</div>
				)}

				{/* Education */}
				{data.education && data.education.length > 0 && (
					<div className="mb-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
							การศึกษา
						</h2>
						{data.education.map((edu, index) => (
							<div key={index} className="mb-3 last:mb-0">
								<h3 className="font-semibold text-gray-900">
									{edu.degree}
								</h3>
								<p className="text-blue-600">
									{edu.institution}
								</p>
								<p className="text-sm text-gray-500">
									{edu.startDate &&
										new Date(
											edu.startDate
										).getFullYear()}{" "}
									-
									{edu.endDate &&
										new Date(edu.endDate).getFullYear()}
								</p>
							</div>
						))}
					</div>
				)}

				{/* Skills */}
				{data.skills && data.skills.length > 0 && (
					<div className="mb-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
							ทักษะ
						</h2>
						{data.skills.map((skillGroup, index) => (
							<div key={index} className="mb-3">
								<h3 className="font-medium text-gray-900 mb-2">
									{skillGroup.category}
								</h3>
								<div className="flex flex-wrap gap-2">
									{skillGroup.items?.map(
										(skill, skillIndex) => (
											<span
												key={skillIndex}
												className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
											>
												{skill}
											</span>
										)
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)

	return (
		<div className="max-w-4xl mx-auto p-6">
			{/* Template Selector */}
			<div className="mb-6">
				<h3 className="text-lg font-semibold mb-3">เลือกเทมเพลต</h3>
				<div className="flex space-x-4">
					{Object.entries(templates).map(([key, name]) => (
						<button
							key={key}
							onClick={() => setSelectedTemplate(key)}
							className={`px-4 py-2 rounded-lg border transition-colors ${
								selectedTemplate === key
									? "bg-blue-600 text-white border-blue-600"
									: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
							}`}
						>
							{name}
						</button>
					))}
				</div>
			</div>

			{/* Resume Preview */}
			<div className="border border-gray-300 rounded-lg overflow-hidden">
				<ModernTemplate data={resumeData} />
			</div>
		</div>
	)
}
