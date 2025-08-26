import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Shield,
  Mail,
  Key,
  Users,
  Github,
  Linkedin,
  ExternalLink,
  Code,
  Database,
  Lock,
} from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">AuthSystem</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#demo"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Demo
            </Link>
            <Link
              href="#contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            Full-Stack Authentication System
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Secure Authentication
            <br />
            Made Simple
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A comprehensive authentication system built with modern
            technologies, featuring secure login, email verification, password
            reset, and OAuth integration with professional email handling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/login">
                <Lock className="mr-2 h-4 w-4" />
                Try Live Demo
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="https://github.com/zainashraf" target="_blank">
                <Github className="mr-2 h-4 w-4" />
                View Source
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with security, scalability, and user experience in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure Authentication</CardTitle>
                <CardDescription>
                  JWT-based authentication with bcrypt password hashing and
                  secure session management
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Email Verification</CardTitle>
                <CardDescription>
                  Professional email verification system using Nodemailer with
                  customizable templates
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Key className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Password Reset</CardTitle>
                <CardDescription>
                  Secure password reset flow with OTP verification and email
                  notifications
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>OAuth Integration</CardTitle>
                <CardDescription>
                  Seamless Google OAuth integration for quick and secure social
                  login
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Complete user dashboard with profile management and account
                  settings
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Modern Stack</CardTitle>
                <CardDescription>
                  Built with Next.js, TypeScript, Tailwind CSS, and modern
                  development practices
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Experience the System
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Try out all the features in the live demo environment
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <h3 className="font-semibold mb-2">User Registration</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create account with email verification
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="w-full bg-transparent"
                >
                  <Link href="/register">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Register
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <h3 className="font-semibold mb-2">User Login</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Secure login with Google OAuth
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="w-full bg-transparent"
                >
                  <Link href="/login">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <h3 className="font-semibold mb-2">User Dashboard</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage profile and settings
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="w-full bg-transparent"
                >
                  <Link href="/dashboard">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Developer Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  ZA
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold mb-4">
                    Built by Zain Ashraf
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Full-stack developer passionate about creating secure,
                    scalable web applications. This authentication system
                    demonstrates expertise in modern web technologies, security
                    best practices, and user experience design.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Button variant="outline" asChild>
                      <Link
                        href="https://github.com/zainashraf005"
                        target="_blank"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        GitHub Profile
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link
                        href="https://linkedin.com/in/zainashraf005"
                        target="_blank"
                      >
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn Profile
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 px-4 border-t">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">AuthSystem</span>
          </div>
          <p className="text-muted-foreground mb-6">
            A professional authentication system showcasing modern web
            development practices
          </p>
          <div className="flex justify-center space-x-6">
            <Link
              href="https://github.com/zainashraf005"
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/zainashraf005"
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
          <div className="mt-8 pt-8 border-t text-sm text-muted-foreground">
            © 2025 Zain Ashraf. Built with Next.js, TypeScript, TansTack Query
            and Tailwind CSS.
          </div>
        </div>
      </footer>
    </div>
  );
}
