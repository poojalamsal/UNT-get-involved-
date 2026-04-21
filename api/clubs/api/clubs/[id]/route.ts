// Backend API endpoint: Club Details
// Assigned to: Ifunaya (Priority 5)

import { NextResponse } from "next/server"
import { clubs, events } from "@/lib/data"
import type { ApiResponse, Club, Event } from "@/lib/types"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const club = clubs.find((c) => c.id === id)

  if (!club) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Club not found",
    }
    return NextResponse.json(response, { status: 404 })
  }

  // Get events for this club
  const clubEvents = events.filter((e) => e.clubId === id)

  const response: ApiResponse<{ club: Club; events: Event[] }> = {
    success: true,
    data: { club, events: clubEvents },
  }

  return NextResponse.json(response)
}
