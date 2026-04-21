// 404 Not Found page for Club Details
// Author: Ifunaya

import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search } from "lucide-react"

export default function ClubNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="flex flex-col items-center justify-center px-4 py-24">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-foreground sm:text-3xl">
            Club Not Found
          </h1>
          <p className="mt-3 max-w-md text-muted-foreground text-pretty">
            The club you&apos;re looking for doesn&apos;t exist or may have been removed. 
            Try browsing our directory to find other great organizations.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse All Clubs
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
