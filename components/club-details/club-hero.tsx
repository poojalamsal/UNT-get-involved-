// Club Hero section with cover image and basic info
// Author: Ifunaya

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, MapPin, Clock, Heart, Share2 } from "lucide-react"
import type { Club } from "@/lib/types"

interface ClubHeroProps {
  club: Club
}

export function ClubHero({ club }: ClubHeroProps) {
  return (
    <section className="relative">
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden sm:h-64 lg:h-80">
        <Image
          src={club.coverImage}
          alt={`${club.name} cover image`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
      </div>

      {/* Club Info Overlay */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-20 sm:-mt-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
            {/* Logo */}
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border-4 border-background bg-background shadow-lg sm:h-36 sm:w-36">
              <Image
                src={club.logo}
                alt={`${club.name} logo`}
                fill
                className="object-cover"
              />
            </div>

            {/* Club Name & Quick Info */}
            <div className="flex flex-1 flex-col gap-3 pb-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-xs font-medium">
                  {club.category}
                </Badge>
                {club.isRecruiting && (
                  <Badge className="bg-accent text-accent-foreground text-xs font-medium">
                    Recruiting
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl text-balance">
                {club.name}
              </h1>
              <p className="text-muted-foreground text-pretty max-w-2xl">
                {club.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex shrink-0 gap-2 sm:pb-2">
              <Button variant="outline" size="icon" aria-label="Save club">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Share club">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button>Join Club</Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground sm:gap-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span><strong className="text-foreground">{club.memberCount}</strong> members</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>{club.meetingSchedule}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{club.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
