"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CheckCircle,
  XCircle,
  User,
  Mail,
  Activity,
  Users,
  TrendingUp,
  AlertTriangle,
  Trash2,
  ShieldAlert,
  Loader2,
} from "lucide-react"
import { useResetOtp, useUser } from "@/hooks/useUser"
import { DashboardShimmer } from "@/components/system/dashboard-shimmer"
import { ModeToggle } from "@/components/system/theme-toggle"
import { Button } from "@/components/ui/button"
import { logoutUser } from "@/api/api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"

export default function Dashboard() {
  // Mock user data - in a real app, this would come from your auth system or API
  const router = useRouter()
  const emailMutation = useResetOtp()

  const { data: user, isLoading } = useUser()

  const handleLogout = async () => {
    await logoutUser()
    router.push("/login")
    toast("logged out successfully")
  }

  const handleVerification = () => {
    emailMutation.mutate(user.email, {
      onSuccess: () => {
        router.push(`/verify-email?email=${user.email}`)
      },
    })
  }

  const stats = [
    { title: "Total Activity", value: "2,847", icon: Activity, change: "+12%" },
    { title: "Team Members", value: "24", icon: Users, change: "+3%" },
    { title: "Growth Rate", value: "18.2%", icon: TrendingUp, change: "+2.1%" },
  ]

  if (isLoading) return <DashboardShimmer />

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button asChild variant={"outline"}>
              <Link href={"/"}>Home</Link>
            </Button>
            <Button onClick={handleLogout} variant={"outline"}>
              Logout
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                <ModeToggle />
              </AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.profilePic || "/diverse-user-avatars.png"} alt={user.fullname} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Welcome back, {(user.fullname as string).split(" ")[0]}!
            </h2>
            <p className="text-muted-foreground">Here&apos;s an overview of your profile and activity.</p>
          </div>

          {/* Verification Warning Card */}
          {!user.isVarified && (
            <Card className="bg-card border-amber-500 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-amber-600">
                  <ShieldAlert className="h-5 w-5" />
                  <span>Email Verification Required</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-amber-500/20 bg-amber-50 dark:bg-amber-950/20 p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">Verify Your Email Address</h4>
                      <p className="text-sm text-muted-foreground">
                        Please verify your email address to access all features and secure your account.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleVerification}
                      disabled={emailMutation.isPending}
                      className="border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white bg-transparent disabled:opacity-50"
                    >
                      {emailMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          Verify Email
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Profile Card */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Profile Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-6">
                <Avatar className="h-20 w-20 border-2 border-border">
                  <AvatarImage src={user.profilePic || "/placeholder.svg"} alt={user.fullname} />

                  <AvatarFallback className="text-lg">
                    {user.fullname
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl capitalize font-semibold text-card-foreground">{user.fullname}</h3>
                      {user.isVarified ? (
                        <Badge variant="default" className="bg-primary text-primary-foreground">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge
                          variant="default"
                          className={`bg-muted text-muted-foreground cursor-pointer ${emailMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                          asChild
                        >
                          <div
                            title={emailMutation.isPending ? "Sending verification..." : "click to verify"}
                            onClick={emailMutation.isPending ? undefined : handleVerification}
                          >
                            {emailMutation.isPending ? (
                              <>
                                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <XCircle className="mr-1 h-3 w-3" />
                                Not Verified
                              </>
                            )}
                          </div>
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>
                      Member since{" "}
                      {new Date(user.createdAt).toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>

                    <span>•</span>
                    <span>Last active 2 hours ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                      <p className="text-xs text-accent font-medium">{stat.change} from last month</p>
                    </div>
                    <div className="rounded-full bg-primary/10 p-3">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity Card */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 rounded-lg bg-muted/50 p-3">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">Profile updated</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 rounded-lg bg-muted/50 p-3">
                  <div className="h-2 w-2 rounded-full bg-accent"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">Email verified</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 rounded-lg bg-muted/50 p-3">
                  <div className="h-2 w-2 rounded-full bg-chart-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">Account created</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-card border-destructive shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                <span>Danger Zone</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium text-foreground">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button variant="destructive" size="sm" asChild>
                    <Link href={"/delete-account"}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
