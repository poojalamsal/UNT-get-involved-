// Integration Module: Events Data Hook
// Assigned to: Ifunaya (Priority 4)

"use client"

import useSWR from "swr"
import type { ApiResponse, Event } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useEvents(category?: string, month?: number, year?: number) {
  const params = new URLSearchParams()
  if (category) params.set("category", category)
  if (month !== undefined) params.set("month", month.toString())
  if (year !== undefined) params.set("year", year.toString())

  const queryString = params.toString()
  const url = `/api/events${queryString ? `?${queryString}` : ""}`

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Event[]>>(
    url,
    fetcher
  )

  return {
    events: data?.data || [],
    isLoading,
    isError: error || !data?.success,
    error: error || data?.error,
    mutate,
  }
}
