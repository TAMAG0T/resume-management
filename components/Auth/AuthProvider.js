// components/Auth/AuthProvider.js
import { createContext, useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"

const AuthContext = createContext()

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}

export function AuthProvider({ children }) {
	const { data: session, status } = useSession()
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (status === "loading") return

		if (session?.user) {
			setUser(session.user)
		} else {
			setUser(null)
		}

		setLoading(false)
	}, [session, status])

	const updateUser = async (userData) => {
		try {
			const response = await fetch("/api/user/profile", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			})

			if (response.ok) {
				const updatedUser = await response.json()
				setUser(updatedUser)
				return updatedUser
			}
		} catch (error) {
			console.error("Failed to update user:", error)
			throw error
		}
	}

	const value = {
		user,
		loading,
		isAuthenticated: !!user,
		isAdmin: user?.role === "admin",
		updateUser,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
