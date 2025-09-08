// middleware.js
import { withAuth } from "next-auth/middleware"

export default withAuth(
	function middleware(req) {
		// Additional middleware logic here
	},
	{
		callbacks: {
			authorized: ({ token, req }) => {
				// ป้องกันหน้าที่ต้องล็อกอิน
				const protectedPaths = [
					// "/dashboard",
					// "/resumes",
					// "/profile",
					// "/settings",
				]
				const isProtectedPath = protectedPaths.some((path) =>
					req.nextUrl.pathname.startsWith(path)
				)

				if (isProtectedPath && !token) {
					return false
				}

				return true
			},
		},
	}
)

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/resumes/:path*",
		"/profile/:path*",
		"/settings/:path*",
	],
}
