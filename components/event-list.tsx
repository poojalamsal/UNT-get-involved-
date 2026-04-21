// Event List Display Component
// Assigned to: Ifunaya (Priority 3)

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Clock,
  MapPin,
  Users,
  Bookmark,
  BookmarkCheck,
  Calendar,
} from "lucide-react"
import type { Event } from "@/lib/types"
import { cn } from "@/lib/utils"

interface EventListProps {
  events: Event[]
  savedEventIds: string[]
  onSaveEvent: (eventId: string, action: "save" | "unsave") => void
  onEventClick?: (event: Event) => void
  title?: string
  emptyMessage?: string
}

const categoryColors: Record<string, string> = {
  Academic: "bg-blue-100 text-blue-800",
  Recreation: "bg-green-100 text-green-800",
  Service: "bg-amber-100 text-amber-800",
  Arts: "bg-purple-100 text-purple-800",
  Cultural: "bg-rose-100 text-rose-800",
}

export function EventList({
  events,
  savedEventIds,
  onSaveEvent,
  onEventClick,
  title = "Events",
  emptyMessage = "No events found.",
}: EventListProps) {
  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">{emptyMessage}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {title && (
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isSaved={savedEventIds.includes(event.id)}
            onSave={onSaveEvent}
            onClick={onEventClick}
          />
        ))}
      </div>
    </div>
  )
}

interface EventCardProps {
  event: Event
  isSaved: boolean
  onSave: (eventId: string, action: "save" | "unsave") => void
  onClick?: (event: Event) => void
}

function EventCard({ event, isSaved, onSave, onClick }: EventCardProps) {
  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all hover:shadow-lg",
        onClick && "cursor-pointer"
      )}
      onClick={() => onClick?.(event)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <Badge
              className={cn(
                "text-xs",
                categoryColors[event.category] || "bg-gray-100 text-gray-800"
              )}
              variant="secondary"
            >
              {event.category}
            </Badge>
            <CardTitle className="line-clamp-2 text-lg leading-tight">
              {event.title}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100 data-[saved=true]:opacity-100"
            data-saved={isSaved}
            onClick={(e) => {
              e.stopPropagation()
              onSave(event.id, isSaved ? "unsave" : "save")
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
          {event.description}
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>
              {event.startTime} - {event.endTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="truncate">{event.clubName}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
