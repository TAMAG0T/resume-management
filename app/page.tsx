/* eslint-disable react/no-unescaped-entities */
"use client"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCode,
	faBirthdayCake,
	faMapMarkerAlt,
	faGraduationCap,
	faBriefcase,
	faServer,
	faDatabase,
	faEnvelope,
	faPhone,
	faPaperPlane,
	faDownload,
	faBars,
	faUser,
} from "@fortawesome/free-solid-svg-icons"

import {
	faHtml5,
	faReact,
	faLinkedin,
	faGithub,
} from "@fortawesome/free-brands-svg-icons"

import { useState, useEffect } from "react"
import Head from "next/head"

export default function Page() {
	const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const sendMessage = (e: React.FormEvent) => {
		e.preventDefault()
		console.log("Form submitted:", formData)
		// TODO: ส่งข้อมูลไป backend หรือ API
		alert("ส่งข้อความเรียบร้อย!")
		setFormData({ name: "", email: "", message: "" })
  }


	useEffect(() => {
		const observers: IntersectionObserver[] = []
		const elements = document.querySelectorAll(
			".fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .timeline-item"
		)
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting)
						entry.target.classList.add("animate")
				})
			},
			{ threshold: 0.2 }
		)
		elements.forEach((el) => observer.observe(el))
		observers.push(observer)
		return () => observers.forEach((o) => o.disconnect())
	}, [])

	const scrollToSection = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
		setMenuOpen(false)
	}

	const downloadCV = () => {
		alert("ดาวน์โหลด CV (คุณสามารถเปลี่ยนเป็นลิงก์ไฟล์จริงได้)")
	}

	return (
		<>
			<Head>
				<title>Portfolio - Mr.Singha Norrajeen</title>
				<link
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
					rel="stylesheet"
				/>
			</Head>
			{/* Navigation */}
			<nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-blue-500/20">
				<div className="container mx-auto px-6 py-4 flex justify-between items-center">
					<div className="text-2xl font-bold text-blue-400">
						My Portfolio
					</div>
					<div className="hidden md:flex space-x-8">
						{[
							"home",
							"about",
							"skills",
							"experience",
							"contact",
						].map((s) => (
							<button
								key={s}
								onClick={() => scrollToSection(s)}
								className="hover:text-blue-400 transition-colors"
							>
								{s === "home"
									? "Home"
									: s === "about"
									? "About"
									: s === "skills"
									? "Skills"
									: s === "experience"
									? "Experience"
									: "Contact"}
							</button>
						))}
					</div>
					<button
						className="md:hidden text-blue-400"
						onClick={() => setMenuOpen(!menuOpen)}
					>
						<FontAwesomeIcon icon={faBars} className="text-xl" />
					</button>
				</div>
			</nav>

			{/* Mobile Menu */}
			{menuOpen && (
				<div className="fixed top-16 left-0 w-full bg-black/95 backdrop-blur-sm z-40">
					<div className="flex flex-col space-y-4 p-6">
						{[
							"home",
							"about",
							"skills",
							"experience",
							"contact",
						].map((s) => (
							<button
								key={s}
								onClick={() => scrollToSection(s)}
								className="hover:text-blue-400 transition-colors"
							>
								{s === "home"
									? "หน้าแรก"
									: s === "about"
									? "เกี่ยวกับ"
									: s === "skills"
									? "ทักษะ"
									: s === "experience"
									? "ประสบการณ์"
									: "ติดต่อ"}
							</button>
						))}
					</div>
				</div>
			)}

			{/* Hero Section */}
			<section
				id="home"
				className="min-h-screen gradient-bg flex items-center justify-center relative overflow-hidden"
			>
				<div className="particles">
					{[
						{ left: "10%", size: 4, delay: 0 },
						{ left: "20%", size: 6, delay: 2 },
						{ left: "30%", size: 3, delay: 4 },
						{ left: "40%", size: 5, delay: 1 },
						{ left: "50%", size: 4, delay: 3 },
						{ left: "60%", size: 6, delay: 5 },
						{ left: "70%", size: 3, delay: 2.5 },
						{ left: "80%", size: 5, delay: 4.5 },
						{ left: "90%", size: 4, delay: 1.5 },
					].map((p, i) => (
						<div
							key={i}
							className="particle"
							style={{
								left: p.left,
								width: `${p.size}px`,
								height: `${p.size}px`,
								animationDelay: `${p.delay}s`,
							}}
						></div>
					))}
				</div>
				<div className="absolute inset-0 bg-black/20"></div>
				<div className="container mx-auto px-6 text-center relative z-10">
					<div className="mb-8 fade-in-up">
						<div className="w-32 h-32 mx-auto mb-6 rounded-full glass border-4 border-blue-400 flex items-center justify-center relative">
							<div className="pulse-ring w-32 h-32"></div>
							<div
								className="pulse-ring w-32 h-32"
								style={{ animationDelay: "1s" }}
							></div>
							<FontAwesomeIcon icon={faUser} className="text-5xl text-blue-400 relative z-10" />
						</div>
					</div>
					<h1 className="text-5xl md:text-7xl font-bold mb-4 fade-in-up">
						Hello, I'm <span className="text-blue-300">Singha</span>
					</h1>
					<div className="text-xl md:text-2xl mb-8 h-8 fade-in-up">
						<span className="typing-animation">
							Senior Web Developer
						</span>
					</div>
					<p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-blue-100 fade-in-up">
						8+ years of experience in web development and
						applications, ready to create innovative solutions for
						your business
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up">
						<button
							onClick={() => scrollToSection("contact")}
							className="modern-btn bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
						>
							<FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Contact
						</button>
						<button
							onClick={downloadCV}
							className="modern-btn glass hover:bg-white/20 border border-white/30 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
						>
							<FontAwesomeIcon icon={faDownload} className="mr-2" /> Download CV
						</button>
					</div>
				</div>
			</section>

			{/* ---------------- About ---------------- */}
			<section
				id="about"
				className="py-20 bg-gray-800 relative overflow-hidden"
			>
				{/* Background Circles */}
				<div className="absolute inset-0 opacity-5">
					<div className="absolute top-10 left-10 w-20 h-20 border border-blue-500 rounded-full animate-pulse"></div>
					<div
						className="absolute top-40 right-20 w-16 h-16 border border-blue-400 rounded-full animate-pulse"
						style={{ animationDelay: "1s" }}
					></div>
					<div
						className="absolute bottom-20 left-1/4 w-12 h-12 border border-blue-300 rounded-full animate-pulse"
						style={{ animationDelay: "2s" }}
					></div>
				</div>

				<div className="container mx-auto px-6 relative z-10">
					<h2 className="text-4xl font-bold text-center mb-16 text-blue-400 fade-in-up">
						About Me
					</h2>

					<div className="grid md:grid-cols-2 gap-12 items-center">
						{/* Card Icon */}
						<div className="fade-in-left">
							<div className="w-full h-80 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-6 card-hover relative overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"></div>
								<FontAwesomeIcon
									icon={faCode}
									className="text-8xl text-white/80 relative z-10"
								/>
							</div>
						</div>

						{/* About Text */}
						<div className="fade-in-right">
							<h3 className="text-2xl font-semibold mb-6 text-blue-300">
								Full-Stack Developer
							</h3>
							<p className="text-gray-300 mb-6 leading-relaxed">
								Professional Web Developer with over 8 years of
								experience, specializing in web technologies and
								consistently staying updated on emerging IT
								trends. Committed to delivering high-quality,
								efficient solutions that add value to the
								organization.
							</p>

							<div className="grid grid-cols-2 gap-4 mb-6">
								<div className="bg-gray-700/50 p-6 rounded-lg text-start card-hover">
									<FontAwesomeIcon
										icon={faBirthdayCake}
										className="text-blue-400 mb-2"
									/>
									<p className="text-sm text-gray-400">Age</p>
									<p className="font-semibold">28 Years</p>
								</div>
								<div className="bg-gray-700/50 p-6 rounded-lg text-start card-hover">
									<FontAwesomeIcon
										icon={faMapMarkerAlt}
										className="text-blue-400 mb-2"
									/>
									<p className="text-sm text-gray-400">
										Address
									</p>
									<p className="font-semibold">
										Pathum Thani
									</p>
								</div>
								<div className="bg-gray-700/50 p-6 rounded-lg text-start card-hover">
									<FontAwesomeIcon
										icon={faGraduationCap}
										className="text-blue-400 mb-2"
									/>
									<p className="text-sm text-gray-400">
										Education
									</p>
									<p className="font-semibold">
										B.Eng. in Computer Engineering
									</p>
								</div>
								<div className="bg-gray-700/50 p-6 rounded-lg text-start card-hover">
									<FontAwesomeIcon
										icon={faBriefcase}
										className="text-blue-400 mb-2"
									/>
									<p className="text-sm text-gray-400">
										Experience
									</p>
									<p className="font-semibold">8+ Years</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ---------------- Skills ---------------- */}
			<section
				id="skills"
				className="py-20 bg-gray-900 relative overflow-hidden"
			>
				{/* Background Gradient */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 to-transparent"></div>
				</div>

				<div className="container mx-auto px-6 relative z-10">
					<h2 className="text-4xl font-bold text-center mb-16 text-blue-400 fade-in-up">
						Skills & Expertise
					</h2>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{/* Frontend */}
						<div
							className="glass p-6 rounded-xl card-hover scale-in"
							style={{ animationDelay: "0.1s" }}
						>
							<div className="text-center mb-6">
								<FontAwesomeIcon
									icon={faHtml5}
									className="text-5xl text-orange-500 mb-4"
								/>
								<h3 className="text-xl font-semibold text-blue-300">
									Frontend
								</h3>
							</div>
							<div className="space-y-4">
								<SkillBar skill="HTML/CSS" percent={95} />
								<SkillBar skill="JavaScript" percent={90} />
								<SkillBar skill="React" percent={85} />
							</div>
						</div>

						{/* Backend */}
						<div
							className="glass p-6 rounded-xl card-hover scale-in"
							style={{ animationDelay: "0.3s" }}
						>
							<div className="text-center mb-6">
								<FontAwesomeIcon
									icon={faServer}
									className="text-5xl text-green-500 mb-4"
								/>
								<h3 className="text-xl font-semibold text-blue-300">
									Backend
								</h3>
							</div>
							<div className="space-y-4">
								<SkillBar skill="Node.js" percent={88} />
								<SkillBar skill="Python" percent={82} />
								<SkillBar skill="PHP" percent={80} />
							</div>
						</div>

						{/* Database & Tools */}
						<div
							className="glass p-6 rounded-xl card-hover scale-in"
							style={{ animationDelay: "0.5s" }}
						>
							<div className="text-center mb-6">
								<FontAwesomeIcon
									icon={faDatabase}
									className="text-5xl text-blue-500 mb-4"
								/>
								<h3 className="text-xl font-semibold text-blue-300">
									Database & Tools
								</h3>
							</div>
							<div className="space-y-4">
								<SkillBar skill="MySQL" percent={85} />
								<SkillBar skill="MongoDB" percent={78} />
								<SkillBar skill="Git" percent={90} />
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ---------------- Experience ---------------- */}
			<section id="experience" className="py-20 bg-gray-900">
				<div className="container mx-auto px-6 relative z-10">
					<h2 className="text-4xl font-bold mb-12 text-center text-blue-400 fade-in-up">
						Work Experience
					</h2>
					<div className="max-w-4xl mx-auto space-y-8">
						{[
							{
								year: "2021 - Present",
								title: "Fullstack Developer",
								desc: "Develop and maintain large-scale websites, lead a team of 5 developers using React, Node.js, and MongoDB technologies",
							},
							{
								year: "2019 - 2021",
								title: "Frontend Developer",
								desc: "Developed websites for various business clients using PHP, Laravel, and MySQL technologies",
							},
							{
								year: "2017 - 2019",
								title: "Backend Developer",
								desc: "Started career in web development, learned new technologies and developed programming skills",
							},
						].map((exp, i) => (
							<div
								key={i}
								className="timeline-item bg-gray-800 p-6 rounded-lg shadow-lg"
							>
								<h3 className="text-xl font-semibold text-blue-300">
									{exp.year}
								</h3>
								<h4 className="text-lg font-bold">{exp.title}</h4>
								<p className="text-gray-300">{exp.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ---------------- Contact ---------------- */}
			<section
				id="contact"
				className="py-20 bg-gray-900 relative overflow-hidden"
			>
				{/* Background Gradient */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-900/30 to-transparent"></div>
				</div>

				<div className="container mx-auto px-6 relative z-10">
					<h2 className="text-4xl font-bold text-center mb-16 text-blue-400 fade-in-up">
						Contact Me
					</h2>
					<div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
						{/* ข้อมูลติดต่อ */}
						<div className="fade-in-left space-y-6">
							<h3 className="text-2xl font-semibold mb-6 text-blue-300">
								Contact Information
							</h3>

							<ContactItem
								icon={faEnvelope}
								label="Email"
								value="pangpang9876@gmail.com"
							/>
							<ContactItem
								icon={faPhone}
								label="Phone"
								value="+66 61-181-8555"
							/>
							<ContactItem
								icon={faLinkedin}
								label="LinkedIn"
								value="linkedin.com/in/num-singha-724664258"
							/>
							<ContactItem
								icon={faGithub}
								label="GitHub"
								value="github.com/tamag0t"
							/>
						</div>

						{/* ฟอร์มส่งข้อความ */}
						<div className="fade-in-right">
							<h3 className="text-2xl font-semibold mb-6 text-blue-300">
								Send Me a Message
							</h3>
							<form className="space-y-6" onSubmit={sendMessage}>
								<input
									type="text"
									name="name"
									placeholder="Name"
									required
									value={formData.name}
									onChange={handleChange}
									className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
								/>
								<input
									type="email"
									name="email"
									placeholder="Email"
									required
									value={formData.email}
									onChange={handleChange}
									className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
								/>
								<textarea
									name="message"
									placeholder="Message"
									rows={5}
									required
									value={formData.message}
									onChange={handleChange}
									className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
								></textarea>
								<button
									type="submit"
									className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center"
								>
									<FontAwesomeIcon
										icon={faPaperPlane}
										className="mr-2"
									/>{" "}
									ส่งข้อความ
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>


			{/* ---------------- Footer ---------------- */}
			<footer className="py-6 bg-gray-900 border-t border-gray-700 text-center text-gray-400">
				<p>© 2025 Singha Norrajeen. All rights reserved.</p>
			</footer>
		</>
	)
}

function SkillBar({ skill, percent }: { skill: string; percent: number }) {
	return (
		<div>
			<div className="flex justify-between mb-2">
				<span>{skill}</span>
				<span>{percent}%</span>
			</div>
			<div className="bg-gray-700 rounded-full h-2">
				<div
					className="skill-bar h-2 rounded-full bg-blue-500"
					style={{ width: `${percent}%` }}
				></div>
			</div>
		</div>
	)
}

function ContactItem({
	icon,
	label,
	value,
}: {
	icon: IconDefinition
	label: string
	value: string
}) {
	return (
		<div className="flex items-center">
			<div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
				<FontAwesomeIcon icon={icon} className="text-white" />
			</div>
			<div>
				<p className="text-gray-400">{label}</p>
				<p className="font-semibold">{value}</p>
			</div>
		</div>
	)
}
