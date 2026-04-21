// Integration Module: Saved Items Hook
// Assigned to: Ifunaya (Priority 4)

"use client"

import useSWR from "swr"
import { useCallback, useState } from "react"
import type { ApiResponse, Club, Event } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useSaved() {
  const [savedEventIds, setSavedEventIds] = useState<string[]>([])
  const [savedClubIds, setSavedClubIds] = useState<string[]>([])

  const { data, error, isLoading, mutate } = useSWR<
    ApiResponse<{ events: Event[]; clubs: Club[] }>
  >("/api/saved", fetcher, {
    onSuccess: (data) => {
      if (data?.data) {
        setSavedEventIds(data.data.events.map((e) => e.id))
        setSavedClubIds(data.data.clubs.map((c) => c.id))
      }
    },
  })

  const saveEvent = useCallback(
    async (eventId: string, action: "save" | "unsave") => {
      // Optimistic update
      if (action === "save") {
        setSavedEventIds((prev) => [...prev, eventId])
      } else {
        setSavedEventIds((prev) => prev.filter((id) => id !== eventId))
      }

      try {
        const response = await fetch("/api/saved", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "event", id: eventId, action }),
        })

        if (!response.ok) {
          throw new Error("Failed to update saved event")
        }

        // Revalidate the cache
        mutate()
      } catch {
        // Revert optimistic update on error
        if (action === "save") {
          setSavedEventIds((prev) => prev.filter((id) => id !== eventId))
        } else {
          setSavedEventIds((prev) => [...prev, eventId])
        }
      }
    },
    [mutate]
  )

  const saveClub = useCallback(
    async (clubId: string, action: "save" | "unsave") => {
      // Optimistic update
      if (action === "save") {
        setSavedClubIds((prev) => [...prev, clubId])
      } else {
        setSavedClubIds((prev) => prev.filter((id) => id !== clubId))
      }

      try {
        const response = await fetch("/api/saved", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "club", id: clubId, action }),
        })

        if (!response.ok) {
          throw new Error("Failed to update saved club")
        }

        // Revalidate the cache
        mutate()
      } catch {
        // Revert optimistic update on error
        if (action === "save") {
          setSavedClubIds((prev) => prev.filter((id) => id !== clubId))
        } else {
          setSavedClubIds((prev) => [...prev, clubId])
        }
      }
    },
    [mutate]
  )

  return {
    savedEvents: data?.data?.events || [],
    savedClubs: data?.data?.clubs || [],
    savedEventIds,
    savedClubIds,
    isLoading,
    isError: error || !data?.success,
    saveEvent,
    saveClub,
    mutate,
  }
}
