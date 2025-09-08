// components/Resume/ResumeForm.js
import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { Plus, Trash2, Save } from "lucide-react"

export default function ResumeForm({ initialData, onSubmit, loading }) {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: initialData || {
			title: "",
			personalInfo: {
				firstName: "",
				lastName: "",
				email: "",
				phone: "",
				address: "",
				summary: "",
			},
			experience: [{}],
			education: [{}],
			skills: [{ category: "", items: [""] }],
			projects: [{}],
			certifications: [{}],
			languages: [{}],
		},
	})

	const {
		fields: experienceFields,
		append: appendExperience,
		remove: removeExperience,
	} = useFieldArray({ control, name: "experience" })

	const {
		fields: educationFields,
		append: appendEducation,
		remove: removeEducation,
	} = useFieldArray({ control, name: "education" })

	const {
		fields: skillFields,
		append: appendSkill,
		remove: removeSkill,
	} = useFieldArray({ control, name: "skills" })

	const {
		fields: projectFields,
		append: appendProject,
		remove: removeProject,
	} = useFieldArray({ control, name: "projects" })

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			{/* Basic Information */}
			<div className="bg-white p-6 rounded-lg shadow border">
				<h2 className="text-xl font-semibold mb-4">ข้อมูลพื้นฐาน</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							ชื่อ Resume
						</label>
						<input
							{...register("title", {
								required: "กรุณาใส่ชื่อ Resume",
							})}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
							placeholder="เช่น Software Developer Resume"
						/>
						{errors.title && (
							<p className="text-red-500 text-sm mt-1">
								{errors.title.message}
							</p>
						)}
					</div>
				</div>
			</div>

			{/* Personal Information */}
			<div className="bg-white p-6 rounded-lg shadow border">
				<h2 className="text-xl font-semibold mb-4">ข้อมูลส่วนตัว</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							ชื่อ
						</label>
						<input
							{...register("personalInfo.firstName")}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							นามสกุล
						</label>
						<input
							{...register("personalInfo.lastName")}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							อีเมล
						</label>
						<input
							type="email"
							{...register("personalInfo.email")}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							เบอร์โทร
						</label>
						<input
							{...register("personalInfo.phone")}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="md:col-span-2">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							ที่อยู่
						</label>
						<input
							{...register("personalInfo.address")}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="md:col-span-2">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							เกี่ยวกับตัวเอง
						</label>
						<textarea
							{...register("personalInfo.summary")}
							rows={4}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
							placeholder="แนะนำตัวเองสั้นๆ..."
						/>
					</div>
				</div>
			</div>

			{/* Experience Section */}
			<div className="bg-white p-6 rounded-lg shadow border">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">
						ประสบการณ์การทำงาน
					</h2>
					<button
						type="button"
						onClick={() => appendExperience({})}
						className="flex items-center px-3 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
					>
						<Plus className="w-4 h-4 mr-1" />
						เพิ่ม
					</button>
				</div>

				{experienceFields.map((field, index) => (
					<div
						key={field.id}
						className="border border-gray-200 rounded-lg p-4 mb-4"
					>
						<div className="flex justify-between items-center mb-3">
							<h3 className="font-medium">
								ประสบการณ์ที่ {index + 1}
							</h3>
							{experienceFields.length > 1 && (
								<button
									type="button"
									onClick={() => removeExperience(index)}
									className="text-red-500 hover:text-red-700"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									บริษัท
								</label>
								<input
									{...register(`experience.${index}.company`)}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									ตำแหน่ง
								</label>
								<input
									{...register(
										`experience.${index}.position`
									)}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									วันที่เริ่มงาน
								</label>
								<input
									type="date"
									{...register(
										`experience.${index}.startDate`
									)}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									วันที่สิ้นสุด
								</label>
								<input
									type="date"
									{...register(`experience.${index}.endDate`)}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div className="md:col-span-2">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									รายละเอียดงาน
								</label>
								<textarea
									{...register(
										`experience.${index}.description`
									)}
									rows={3}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Submit Button */}
			<div className="flex justify-end space-x-4">
				<button
					type="button"
					onClick={() => router.back()}
					className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
				>
					ยกเลิก
				</button>
				<button
					type="submit"
					disabled={loading}
					className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
				>
					<Save className="w-4 h-4 mr-2" />
					{loading ? "กำลังบันทึก..." : "บันทึก"}
				</button>
			</div>
		</form>
	)
}
