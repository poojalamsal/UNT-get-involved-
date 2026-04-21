// Club Officers section showing leadership team
// Author: Ifunaya

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ClubMember } from "@/lib/types"

interface ClubOfficersProps {
  officers: ClubMember[]
}

export function ClubOfficers({ officers }: ClubOfficersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Leadership Team</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {officers.map((officer) => (
            <div
              key={officer.id}
              className="flex items-center gap-3 rounded-lg border border-border p-3"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={officer.avatar} alt={officer.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {officer.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{officer.name}</p>
                <p className="text-sm text-muted-foreground">
                  {officer.role} &middot; {officer.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
