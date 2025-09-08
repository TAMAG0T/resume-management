// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import dbConnect from "../../../lib/db"
import User from "../../../models/User"

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				await dbConnect()

				const user = await User.findOne({ email: credentials.email })

				if (
					user &&
					bcrypt.compareSync(credentials.password, user.password)
				) {
					return {
						id: user._id,
						email: user.email,
						firstName: user.firstName,
						lastName: user.lastName,
						role: user.role,
					}
				}
				return null
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
				token.role = user.role
			}
			return token
		},
		async session({ session, token }) {
			session.user.id = token.id
			session.user.role = token.role
			return session
		},
	},
	pages: {
		signIn: "/login",
		signUp: "/register",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
})
