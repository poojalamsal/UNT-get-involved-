// Backend API endpoint: Events List
// Assigned to: Ifunaya (Priority 5)

import { NextResponse } from "next/server"
import { events } from "@/lib/data"
import type { ApiResponse, Event } from "@/lib/types"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const month = searchParams.get("month")
  const year = searchParams.get("year")

  let filteredEvents = [...events]

  // Filter by category
  if (category && category !== "All") {
    filteredEvents = filteredEvents.filter(
      (event) => event.category.toLowerCase() === category.toLowerCase()
    )
  }

  // Filter by month and year
  if (month && year) {
    filteredEvents = filteredEvents.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getMonth() === parseInt(month) &&
        eventDate.getFullYear() === parseInt(year)
      )
    })
  }

  // Sort by date
  filteredEvents.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  const response: ApiResponse<Event[]> = {
    success: true,
    data: filteredEvents,
  }

  return NextResponse.json(response)
}
