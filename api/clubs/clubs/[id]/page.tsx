// Club Details Page - displays comprehensive information about a specific club
// Author: Ifunaya
// Task: Priority 4 - Club Details page

import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { ClubHero } from "@/components/club-details/club-hero"
import { ClubAbout } from "@/components/club-details/club-about"
import { ClubEvents } from "@/components/club-details/club-events"
import { ClubOfficers } from "@/components/club-details/club-officers"
import { ClubContact } from "@/components/club-details/club-contact"
import { getClubById } from "@/lib/mock-data"

interface ClubPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ClubPageProps) {
  const { id } = await params
  const club = getClubById(id)
  
  if (!club) {
    return {
      title: "Club Not Found | CampusClubs",
    }
  }

  return {
    title: `${club.name} | CampusClubs`,
    description: club.description,
  }
}

export default async function ClubPage({ params }: ClubPageProps) {
  const { id } = await params
  const club = getClubById(id)

  if (!club) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <ClubHero club={club} />

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Main Info */}
            <div className="space-y-8 lg:col-span-2">
              <ClubAbout club={club} />
              <ClubEvents events={club.events} />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              <ClubOfficers officers={club.officers} />
              <ClubContact club={club} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              CampusClubs - Built by Ifunaya for CS Junior Project
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">About</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
