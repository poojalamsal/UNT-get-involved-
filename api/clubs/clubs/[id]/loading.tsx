// Loading skeleton for Club Details page
// Author: Ifunaya

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ClubLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Skeleton */}
        <div className="relative">
          <Skeleton className="h-48 w-full sm:h-64 lg:h-80" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative -mt-20 sm:-mt-24">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
                <Skeleton className="h-28 w-28 shrink-0 rounded-xl sm:h-36 sm:w-36" />
                <div className="flex flex-1 flex-col gap-3 pb-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-10 w-64" />
                  <Skeleton className="h-4 w-full max-w-md" />
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-24" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex gap-2 pt-4">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-36" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-24 w-full rounded-lg" />
                  <Skeleton className="h-24 w-full rounded-lg" />
                </CardContent>
              </Card>
            </div>
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-20" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-16 w-full rounded-lg" />
                  <Skeleton className="h-16 w-full rounded-lg" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
