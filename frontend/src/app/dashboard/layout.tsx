import { Inter } from "next/font/google"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={inter.className}>
      <nav className="bg-green-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">ESG Oracle</h1>
          <div className="flex space-x-4">
            <button className="hover:text-green-200">Dashboard</button>
            <button className="hover:text-green-200">Settings</button>
            <button className="hover:text-green-200">Profile</button>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}

