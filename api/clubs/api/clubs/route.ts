// Backend API endpoint: Club List
// Assigned to: Ifunaya (Priority 5)

import { NextResponse } from "next/server"
import { clubs } from "@/lib/data"
import type { ApiResponse, Club } from "@/lib/types"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")

  let filteredClubs = [...clubs]

  // Filter by category
  if (category && category !== "All") {
    filteredClubs = filteredClubs.filter(
      (club) => club.category.toLowerCase() === category.toLowerCase()
    )
  }

  // Filter by search query
  if (search) {
    const searchLower = search.toLowerCase()
    filteredClubs = filteredClubs.filter(
      (club) =>
        club.name.toLowerCase().includes(searchLower) ||
        club.description.toLowerCase().includes(searchLower) ||
        club.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    )
  }

  const response: ApiResponse<Club[]> = {
    success: true,
    data: filteredClubs,
  }

  return NextResponse.json(response)
}
