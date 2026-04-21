// Club Events section showing upcoming events
// Author: Ifunaya

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react"
import type { ClubEvent } from "@/lib/types"

interface ClubEventsProps {
  events: ClubEvent[]
}

export function ClubEvents({ events }: ClubEventsProps) {
  if (events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No upcoming events scheduled. Check back soon!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Upcoming Events</CardTitle>
        <Button variant="ghost" size="sm" className="text-primary">
          View All <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="group relative rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/30"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {event.location}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="shrink-0">
                  RSVP
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
