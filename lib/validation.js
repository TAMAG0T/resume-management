// lib/validation.js
export const validateEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

export const validatePassword = (password) => {
	// At least 8 characters, contains letters and numbers
	const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/
	return passwordRegex.test(password)
}

export const validateName = (name) => {
	return name && name.trim().length >= 2
}

export const sanitizeInput = (input) => {
	return input.trim().replace(/[<>]/g, "")
}
