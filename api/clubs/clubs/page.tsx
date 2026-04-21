// Clubs Page - UNT Get Involved
// Uses Ifunaya's backend integration hooks

"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { CategoryFilter } from "@/components/category-filter"
import { useClubs } from "@/hooks/use-clubs"
import { useSaved } from "@/hooks/use-saved"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Users,
  MapPin,
  Calendar,
  Mail,
  Search,
  Bookmark,
  BookmarkCheck,
} from "lucide-react"
import type { Club } from "@/lib/types"
import { cn } from "@/lib/utils"

const categoryColors: Record<string, string> = {
  Academic: "bg-blue-100 text-blue-800",
  Recreation: "bg-green-100 text-green-800",
  Service: "bg-amber-100 text-amber-800",
  Arts: "bg-purple-100 text-purple-800",
  Cultural: "bg-rose-100 text-rose-800",
}

export default function ClubsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const { clubs, isLoading } = useClubs(
    selectedCategory !== "All" ? selectedCategory : undefined,
    searchQuery || undefined
  )
  const { savedClubIds, saveClub } = useSaved()

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="clubs" />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Explore Clubs
          </h1>
          <p className="mt-2 text-muted-foreground">
            Find your community among 500+ student organizations at UNT.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-6 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search clubs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Clubs Grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-72 w-full rounded-lg" />
            ))}
          </div>
        ) : clubs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">
                No clubs found matching your criteria.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clubs.map((club) => (
              <ClubCard
                key={club.id}
                club={club}
                isSaved={savedClubIds.includes(club.id)}
                onSave={saveClub}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>UNT Get Involved - Connecting Students with Campus Life</p>
          <p className="mt-1">University of North Texas</p>
        </div>
      </footer>
    </div>
  )
}

interface ClubCardProps {
  club: Club
  isSaved: boolean
  onSave: (clubId: string, action: "save" | "unsave") => void
}

function ClubCard({ club, isSaved, onSave }: ClubCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <Badge
              className={cn(
                "text-xs",
                categoryColors[club.category] || "bg-gray-100 text-gray-800"
              )}
              variant="secondary"
            >
              {club.category}
            </Badge>
            <CardTitle className="line-clamp-2 text-lg leading-tight">
              {club.name}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100 data-[saved=true]:opacity-100"
            data-saved={isSaved}
            onClick={(e) => {
              e.stopPropagation()
              onSave(club.id, isSaved ? "unsave" : "save")
            }}
          >
            {isSaved ? (
              <BookmarkCheck className="h-5 w-5 text-primary" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {club.description}
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span>{club.memberCount} members</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="truncate">{club.meetingSchedule}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="truncate">{club.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            <span className="truncate">{club.contactEmail}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-1">
          {club.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
