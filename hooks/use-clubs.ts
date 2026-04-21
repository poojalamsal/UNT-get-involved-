// Integration Module: Clubs Data Hook
// Assigned to: Ifunaya (Priority 4)

"use client"

import useSWR from "swr"
import type { ApiResponse, Club, Event } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useClubs(category?: string, search?: string) {
  const params = new URLSearchParams()
  if (category) params.set("category", category)
  if (search) params.set("search", search)

  const queryString = params.toString()
  const url = `/api/clubs${queryString ? `?${queryString}` : ""}`

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Club[]>>(
    url,
    fetcher
  )

  return {
    clubs: data?.data || [],
    isLoading,
    isError: error || !data?.success,
    error: error || data?.error,
    mutate,
  }
}

export function useClubDetails(clubId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponse<{ club: Club; events: Event[] }>
  >(clubId ? `/api/clubs/${clubId}` : null, fetcher)

  return {
    club: data?.data?.club || null,
    clubEvents: data?.data?.events || [],
    isLoading,
    isError: error || (data && !data.success),
    error: error || data?.error,
    mutate,
  }
}
