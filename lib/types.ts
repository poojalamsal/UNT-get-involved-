// Types for UNT Get Involved Application

export interface Club {
  id: string
  name: string
  description: string
  category: string
  memberCount: number
  meetingSchedule: string
  location: string
  contactEmail: string
  imageUrl?: string
  tags: string[]
}

export interface Event {
  id: string
  title: string
  description: string
  date: Date
  startTime: string
  endTime: string
  location: string
  clubId: string
  clubName: string
  category: string
  imageUrl?: string
  isSaved?: boolean
}

export interface SavedEvent {
  id: string
  eventId: string
  userId: string
  savedAt: Date
}

export interface SavedClub {
  id: string
  clubId: string
  userId: string
  savedAt: Date
}

export interface User {
  id: string
  email: string
  name: string
  savedEvents: string[]
  savedClubs: string[]
}

export interface JoinRequest {
  id: string
  clubId: string
  userId: string
  userName: string
  userEmail: string
  message?: string
  status: "pending" | "approved" | "rejected"
  createdAt: Date
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
