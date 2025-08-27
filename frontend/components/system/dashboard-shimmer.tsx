import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function DashboardShimmer() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Shimmer */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="h-6 w-24 bg-muted animate-pulse rounded"></div>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
            <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
            <div className="h-8 w-8 bg-muted animate-pulse rounded-full"></div>
            <div className="h-8 w-8 bg-muted animate-pulse rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content Shimmer */}
      <main className="p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Welcome Section Shimmer */}
          <div className="space-y-2">
            <div className="h-8 w-64 bg-muted animate-pulse rounded"></div>
            <div className="h-4 w-96 bg-muted animate-pulse rounded"></div>
          </div>

          {/* Profile Card Shimmer */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader>
              <div className="h-6 w-48 bg-muted animate-pulse rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-6">
                <div className="h-20 w-20 bg-muted animate-pulse rounded-full"></div>
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="h-6 w-48 bg-muted animate-pulse rounded"></div>
                    <div className="h-4 w-64 bg-muted animate-pulse rounded"></div>
                  </div>
                  <div className="h-4 w-80 bg-muted animate-pulse rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid Shimmer */}
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-card border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
                      <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
                      <div className="h-3 w-20 bg-muted animate-pulse rounded"></div>
                    </div>
                    <div className="h-11 w-11 bg-muted animate-pulse rounded-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity Shimmer */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader>
              <div className="h-6 w-36 bg-muted animate-pulse rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-3 rounded-lg bg-muted/50 p-3">
                    <div className="h-2 w-2 bg-muted animate-pulse rounded-full"></div>
                    <div className="flex-1 space-y-1">
                      <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
                      <div className="h-3 w-20 bg-muted animate-pulse rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
