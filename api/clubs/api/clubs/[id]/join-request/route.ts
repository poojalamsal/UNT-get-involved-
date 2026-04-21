// Backend API endpoint: Club Join Request
// Assigned to: Ifunaya (Priority 5)

import { NextResponse } from "next/server"
import { clubs } from "@/lib/data"
import type { ApiResponse, JoinRequest } from "@/lib/types"

// In-memory storage for join requests (would be replaced with a database in production)
const joinRequests: JoinRequest[] = []

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clubId } = await params
    const body = await request.json()

    // Validate required fields
    const { userName, userEmail, message } = body

    if (!userName || !userEmail) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Name and email are required",
      }
      return NextResponse.json(response, { status: 400 })
    }

    // Check if club exists
    const club = clubs.find((c) => c.id === clubId)
    if (!club) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Club not found",
      }
      return NextResponse.json(response, { status: 404 })
    }

    // Check for duplicate request (same email, same club, pending status)
    const existingRequest = joinRequests.find(
      (req) =>
        req.clubId === clubId &&
        req.userEmail.toLowerCase() === userEmail.toLowerCase() &&
        req.status === "pending"
    )

    if (existingRequest) {
      const response: ApiResponse<null> = {
        success: false,
        error: "You already have a pending request for this club",
      }
      return NextResponse.json(response, { status: 409 })
    }

    // Create join request
    const newRequest: JoinRequest = {
      id: `jr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      clubId,
      userId: `user_${userEmail.replace(/[^a-zA-Z0-9]/g, "_")}`,
      userName,
      userEmail,
      message: message || "",
      status: "pending",
      createdAt: new Date(),
    }

    joinRequests.push(newRequest)

    const response: ApiResponse<JoinRequest> = {
      success: true,
      data: newRequest,
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Invalid request body",
    }
    return NextResponse.json(response, { status: 400 })
  }
}

// GET endpoint to retrieve join requests for a club (for admin/club officers)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: clubId } = await params

  // Check if club exists
  const club = clubs.find((c) => c.id === clubId)
  if (!club) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Club not found",
    }
    return NextResponse.json(response, { status: 404 })
  }

  const clubRequests = joinRequests.filter((req) => req.clubId === clubId)

  const response: ApiResponse<JoinRequest[]> = {
    success: true,
    data: clubRequests,
  }

  return NextResponse.json(response)
}
