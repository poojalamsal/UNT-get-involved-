// Backend API endpoint: Saved Events & Clubs
// Assigned to: Ifunaya (Priority 5)

import { NextResponse } from "next/server"
import { clubs, events } from "@/lib/data"
import type { ApiResponse, Club, Event } from "@/lib/types"

// In-memory storage for saved items (would be database in production)
const savedEventIds: Set<string> = new Set()
const savedClubIds: Set<string> = new Set()

export async function GET() {
  const savedEvents = events.filter((e) => savedEventIds.has(e.id))
  const savedClubs = clubs.filter((c) => savedClubIds.has(c.id))

  const response: ApiResponse<{ events: Event[]; clubs: Club[] }> = {
    success: true,
    data: { events: savedEvents, clubs: savedClubs },
  }

  return NextResponse.json(response)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { type, id, action } = body

  if (!type || !id || !action) {
    return NextResponse.json(
      { success: false, error: "Missing required fields" },
      { status: 400 }
    )
  }

  if (type === "event") {
    if (action === "save") {
      savedEventIds.add(id)
    } else if (action === "unsave") {
      savedEventIds.delete(id)
    }
  } else if (type === "club") {
    if (action === "save") {
      savedClubIds.add(id)
    } else if (action === "unsave") {
      savedClubIds.delete(id)
    }
  }

  return NextResponse.json({
    success: true,
    data: {
      savedEventIds: Array.from(savedEventIds),
      savedClubIds: Array.from(savedClubIds),
    },
  })
}
