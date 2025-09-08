// /Users/singha/Documents/web/localhost/leaning/next/resume-management/pages/_app.js
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"
import "@/styles/app.css"

// ใช้ฟังก์ชันนี้เพื่อครอบ Component ทั้งหมดด้วย SessionProvider
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    // `session` ที่ได้จาก pageProps จะถูกใช้เป็นค่าเริ่มต้น
    <SessionProvider session={session}>
      <Component {...pageProps} />
      {/* Toaster สำหรับแสดง notification จาก react-hot-toast */}
      <Toaster position="bottom-center" />
    </SessionProvider>
  )
}
