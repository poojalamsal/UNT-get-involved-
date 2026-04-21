// Club About section with description, requirements, and tags
// Author: Ifunaya

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"
import type { Club } from "@/lib/types"

interface ClubAboutProps {
  club: Club
}

export function ClubAbout({ club }: ClubAboutProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">About</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Long Description */}
        <p className="text-muted-foreground leading-relaxed text-pretty">
          {club.longDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {club.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Requirements */}
        {club.requirements && club.requirements.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Membership Requirements</h3>
            <ul className="space-y-2">
              {club.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Dues */}
        {club.dues && (
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm">
              <span className="font-medium text-foreground">Membership Dues:</span>{" "}
              <span className="text-muted-foreground">{club.dues}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
