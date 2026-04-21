// Calendar UI + Event Display Component
// Assigned to: Ifunaya (Priority 3)

"use client"

import { useState, useMemo } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
} from "lucide-react"
import type { Event } from "@/lib/types"
import { cn } from "@/lib/utils"

interface EventCalendarProps {
  events: Event[]
  savedEventIds: string[]
  onSaveEvent: (eventId: string, action: "save" | "unsave") => void
  onEventClick?: (event: Event) => void
}

const categoryColors: Record<string, string> = {
  Academic: "bg-blue-100 text-blue-800",
  Recreation: "bg-green-100 text-green-800",
  Service: "bg-amber-100 text-amber-800",
  Arts: "bg-purple-100 text-purple-800",
  Cultural: "bg-rose-100 text-rose-800",
}

export function EventCalendar({
  events,
  savedEventIds,
  onSaveEvent,
  onEventClick,
}: EventCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Get dates that have events
  const eventDates = useMemo(() => {
    const dates = new Map<string, Event[]>()
    events.forEach((event) => {
      const dateKey = new Date(event.date).toDateString()
      if (!dates.has(dateKey)) {
        dates.set(dateKey, [])
      }
      dates.get(dateKey)!.push(event)
    })
    return dates
  }, [events])

  // Get events for selected date
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return []
    const dateKey = selectedDate.toDateString()
    return eventDates.get(dateKey) || []
  }, [selectedDate, eventDates])

  // Get upcoming events (next 7 days)
  const upcomingEvents = useMemo(() => {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    return events
      .filter((event) => {
        const eventDate = new Date(event.date)
        return eventDate >= today && eventDate <= nextWeek
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [events])

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    )
  }

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Calendar Section */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <CalendarDays className="h-5 w-5 text-primary" />
            Event Calendar
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[140px] text-center font-medium">
              {currentMonth.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            className="rounded-md border p-3"
            modifiers={{
              hasEvent: (date) => eventDates.has(date.toDateString()),
            }}
            modifiersClassNames={{
              hasEvent: "bg-primary/20 font-bold text-primary",
            }}
          />

          {/* Selected Date Events */}
          {selectedDate && (
            <div className="mt-6">
              <h3 className="mb-3 font-semibold text-muted-foreground">
                Events on {formatDate(selectedDate)}
              </h3>
              {selectedDateEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No events scheduled for this day.
                </p>
              ) : (
                <div className="space-y-3">
                  {selectedDateEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      isSaved={savedEventIds.includes(event.id)}
                      onSave={onSaveEvent}
                      onClick={onEventClick}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Events Sidebar */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Clock className="h-5 w-5 text-primary" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            {upcomingEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No upcoming events in the next 7 days.
              </p>
            ) : (
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <EventCardCompact
                    key={event.id}
                    event={event}
                    isSaved={savedEventIds.includes(event.id)}
                    onSave={onSaveEvent}
                    onClick={onEventClick}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
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
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-4 transition-all hover:shadow-md",
        onClick && "cursor-pointer"
      )}
      onClick={() => onClick?.(event)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">{event.title}</h4>
            <Badge
              className={cn(
                "text-xs",
                categoryColors[event.category] || "bg-gray-100 text-gray-800"
              )}
              variant="secondary"
            >
              {event.category}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {event.startTime} - {event.endTime}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {event.location}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {event.clubName}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
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
    </div>
  )
}

function EventCardCompact({ event, isSaved, onSave, onClick }: EventCardProps) {
  const eventDate = new Date(event.date)
  const day = eventDate.getDate()
  const month = eventDate.toLocaleDateString("en-US", { month: "short" })

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border bg-card p-3 transition-all hover:shadow-sm",
        onClick && "cursor-pointer"
      )}
      onClick={() => onClick?.(event)}
    >
      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
        <span className="text-xs font-medium uppercase">{month}</span>
        <span className="text-lg font-bold leading-none">{day}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-semibold">{event.title}</h4>
        <p className="text-xs text-muted-foreground">{event.clubName}</p>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {event.startTime}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0"
        onClick={(e) => {
          e.stopPropagation()
          onSave(event.id, isSaved ? "unsave" : "save")
        }}
      >
        {isSaved ? (
          <BookmarkCheck className="h-4 w-4 text-primary" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
