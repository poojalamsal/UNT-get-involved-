// Main Events Page - UNT Get Involved
// Ifunaya's components: Calendar UI, Event Display, Backend Integration

"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { EventCalendar } from "@/components/event-calendar"
import { EventList } from "@/components/event-list"
import { CategoryFilter } from "@/components/category-filter"
import { useEvents } from "@/hooks/use-events"
import { useSaved } from "@/hooks/use-saved"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarDays, LayoutGrid } from "lucide-react"

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { events, isLoading } = useEvents(
    selectedCategory !== "All" ? selectedCategory : undefined
  )
  const { savedEventIds, saveEvent } = useSaved()

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="events" />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Campus Events
          </h1>
          <p className="mt-2 text-muted-foreground">
            Discover events happening at UNT and never miss out on campus
            activities.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* View Tabs */}
        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList>
            <TabsTrigger value="calendar" className="gap-2">
              <CalendarDays className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2">
              <LayoutGrid className="h-4 w-4" />
              List View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            {isLoading ? (
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Skeleton className="h-[500px] w-full rounded-lg" />
                </div>
                <Skeleton className="h-[500px] w-full rounded-lg" />
              </div>
            ) : (
              <EventCalendar
                events={events}
                savedEventIds={savedEventIds}
                onSaveEvent={saveEvent}
              />
            )}
          </TabsContent>

          <TabsContent value="list">
            {isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <EventList
                events={events}
                savedEventIds={savedEventIds}
                onSaveEvent={saveEvent}
                title=""
                emptyMessage="No events found for this category."
              />
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
