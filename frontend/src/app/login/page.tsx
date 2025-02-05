"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  })
  const [isLogin, setIsLogin] = useState(true)
  const [resetPassword, setResetPassword] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
    console.log("current email: ", value)
  }

  const sendResetPassword = async () => {
    const trimmedEmail = data.email.trim()
    if (!trimmedEmail) {
      alert("Please enter a valid email address.")
      return
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
        redirectTo: `${window.location.origin}/reset`,
      })

      if (error) {
        console.error("Supabase Error:", error)
        alert(`Error: ${error.message}`)
      } else {
        alert("Reset link sent! Check your email.")
        setResetPassword(false)
      }
    } catch (error) {
      console.error("Unexpected Error:", error)
      alert("An unexpected error occurred.")
    }
  }

  const login = async () => {
    try {
      const { data: user, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        console.error("Login error:", error.message)
        alert(error.message)
      } else {
        console.log("Login successful:", user)
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Unexpected error during login:", error)
    }
  }

  const signUp = async () => {
    try {
      const { data: user, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })

      if (error) {
        console.error("Sign-Up error:", error.message)
        alert(error.message)
      } else {
        console.log("Sign-Up successful:", user)
        alert("Sign-up successful! Please check your email to verify your account.")
        setIsLogin(true)
      }
    } catch (error) {
      console.error("Unexpected error during sign-up:", error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      login()
    } else {
      signUp()
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        console.error("Google Sign-In error:", error.message)
        alert(error.message)
      }
    } catch (error) {
      console.error("Unexpected error during Google sign-in:", error)
    }
  }

  const GoogleIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-google"
    >
      <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10S6.5 2 12 2z" />
      <path d="M12 2v20M2 12h20" />
    </svg>
  )

  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-black">
            {isLogin ? "Login to ESG Oracle" : "Create ESG Oracle Account"}
          </CardTitle>
          <CardDescription className="text-center text-black">
            {isLogin ? "Access sustainable investing insights" : "Sign up for ESG-driven investment decisions"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-black">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={data.password}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-700">
              {isLogin ? "Sign in" : "Sign up"}
            </Button>
          </form>
          <div className="mt-4">
            <Button
              onClick={signInWithGoogle}
              className="w-full bg-green-600 text-white hover:bg-green-700"
            >
              <GoogleIcon />
              <span className="ml-2">Sign in with Google</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <Button variant="link" className="text-sm text-green-600" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </Button>
          {isLogin && (
            <Button variant="link" className="text-sm text-green-600" onClick={() => setResetPassword(true)}>
              Forgot password?
            </Button>
          )}
        </CardFooter>
      </Card>
      <div className="mt-4">
        <Button asChild variant="link">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>

      {resetPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={() => setResetPassword(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={sendResetPassword} className="bg-green-600 text-white hover:bg-green-700">
                Send Reset Link
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

