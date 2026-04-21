// Saved Items Page - UNT Get Involved
// Uses Ifunaya's Saved Events Retrieval integration

"use client"

import { Header } from "@/components/header"
import { EventList } from "@/components/event-list"
import { useSaved } from "@/hooks/use-saved"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  MapPin,
  Calendar,
  Mail,
  Bookmark,
  BookmarkCheck,
  CalendarDays,
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

export default function SavedPage() {
  const {
    savedEvents,
    savedClubs,
    savedEventIds,
    savedClubIds,
    isLoading,
    saveEvent,
    saveClub,
  } = useSaved()

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="saved" />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Saved Items
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your bookmarked events and clubs in one place.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList>
            <TabsTrigger value="events" className="gap-2">
              <CalendarDays className="h-4 w-4" />
              Events ({savedEvents.length})
            </TabsTrigger>
            <TabsTrigger value="clubs" className="gap-2">
              <Users className="h-4 w-4" />
              Clubs ({savedClubs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            {isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full rounded-lg" />
                ))}
              </div>
            ) : savedEvents.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bookmark className="h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">
                    No saved events yet.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Browse events and click the bookmark icon to save them here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <EventList
                events={savedEvents}
                savedEventIds={savedEventIds}
                onSaveEvent={saveEvent}
                title=""
                emptyMessage="No saved events."
              />
            )}
          </TabsContent>

          <TabsContent value="clubs">
            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-72 w-full rounded-lg" />
                ))}
              </div>
            ) : savedClubs.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bookmark className="h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">
                    No saved clubs yet.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Browse clubs and click the bookmark icon to save them here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {savedClubs.map((club) => (
                  <SavedClubCard
                    key={club.id}
                    club={club}
                    isSaved={savedClubIds.includes(club.id)}
                    onSave={saveClub}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
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

interface SavedClubCardProps {
  club: Club
  isSaved: boolean
  onSave: (clubId: string, action: "save" | "unsave") => void
}

function SavedClubCard({ club, isSaved, onSave }: SavedClubCardProps) {
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
            className="shrink-0"
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
      </CardContent>
    </Card>
  )
}
