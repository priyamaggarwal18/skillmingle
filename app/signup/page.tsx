'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, Mail, Lock, User, ArrowRight, Building } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin")
  const [userType, setUserType] = useState("Manager")

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email')
    const password = formData.get('password')
    // Handle sign in logic here
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const username = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirm-password')
    const companyName = formData.get('company-name')
    const role = formData.get('user-type')
    // Handle sign up logic here
  }

  return (
    <div className="min-h-screen bg-dark-purple-gradient bg-violet-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xs" // Reduced the width here
      >
        <Card className="border shadow-2xl w-full max-w-xs"> {/* Reduced the width here */}
          <CardHeader className="space-y-1 bg-gradient-to-r  text-white rounded-t-lg">
            <motion.div
              className="flex items-center justify-center mb-4"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Zap className="h-8 w-8 mr-2 text-violet-500" />
              <CardTitle className="text-4xl font-bold text-violet-500">SkillMingle</CardTitle>
            </motion.div>
            <CardDescription className="text-blue-100 text-center text-lg">
              Connect, collaborate, and grow your skills
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="flex w-full items-center mb-6">
                <TabsTrigger value="signin" className={activeTab === "signin" ? "bg-violet-500 px-6 py-2 text-lg" : ""}>Sign In</TabsTrigger>
                <TabsTrigger value="signup" className={activeTab === "signup" ? "bg-violet-500 px-6 py-2 text-lg" : ""}>Sign Up</TabsTrigger>
                </TabsList>
              <AnimatePresence mode="wait">
                <TabsContent value="signin" key="signin">
                  <motion.form {...fadeIn} onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                        <div className="relative pl-2">
                        <Input id="signin-email" name="email" placeholder="m@example.com" type="email" className="pl-10 w-full max-w-xs" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <div className="relative">
                        <Input id="signin-password" name="password" type="password" className="pl-10 w-full max-w-xs" required />
                      </div>
                    </div>
                    <Button className="w-full bg-violet-500 text-white transition-all duration-300" type="submit">
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.form>
                </TabsContent>
                <TabsContent value="signup" key="signup">
                  <motion.form {...fadeIn} onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <Input id="name" name="name" placeholder="John Doe" className="pl-10 w-full max-w-xs" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input id="signup-email" name="email" placeholder="m@example.com" type="email" className="pl-10 w-full max-w-xs" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user-type">User Type</Label>
                        <Select name="user-type" value={userType} onValueChange={setUserType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                        <SelectContent className="bg-black w-full">
                          <SelectItem value="Manager" className="hover:bg-violet-500 w-full">Manager</SelectItem>
                          <SelectItem value="Developer" className="hover:bg-violet-500 w-full">Developer</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    {userType === "Manager" && (
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <div className="relative">
                          <Input id="company-name" name="company-name" placeholder="Your Company" className="pl-10 w-full max-w-xs" required />
                        </div>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Input id="signup-password" name="password" type="password" className="pl-10 w-full max-w-xs" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Input id="confirm-password" name="confirm-password" type="password" className="pl-10 w-full max-w-xs" required />
                      </div>
                    </div>
                    <Button className="w-full bg-violet-500 text-white transition-all duration-300" type="submit">
                      Sign Up
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.form>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </CardContent>
          <CardFooter className="bg-gray-50 rounded-b-lg">
            <p className="text-center text-gray-600 w-full text-sm">© 2024 SkillMingle. All rights reserved.</p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
  
}