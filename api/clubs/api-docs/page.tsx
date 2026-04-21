"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react"

interface Endpoint {
  method: "GET" | "POST" | "PUT" | "DELETE"
  path: string
  description: string
  parameters?: { name: string; type: string; description: string; required?: boolean }[]
  body?: { name: string; type: string; description: string; required?: boolean }[]
  exampleResponse: string
}

const endpoints: Endpoint[] = [
  {
    method: "GET",
    path: "/api/clubs",
    description: "Retrieve a list of all student clubs and organizations",
    parameters: [
      { name: "category", type: "string", description: "Filter by category (e.g., Academic, Cultural, Sports)", required: false },
      { name: "search", type: "string", description: "Search clubs by name or description", required: false },
    ],
    exampleResponse: `{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Computer Science Club",
      "description": "A community for CS enthusiasts...",
      "category": "Academic",
      "memberCount": 150,
      "imageUrl": "/images/cs-club.jpg",
      "meetingSchedule": "Wednesdays 5-6pm"
    }
  ]
}`,
  },
  {
    method: "GET",
    path: "/api/clubs/[id]",
    description: "Get detailed information about a specific club",
    parameters: [
      { name: "id", type: "string", description: "The unique club identifier", required: true },
    ],
    exampleResponse: `{
  "success": true,
  "data": {
    "club": {
      "id": "1",
      "name": "Computer Science Club",
      "description": "Full description...",
      "category": "Academic",
      "memberCount": 150,
      "contactEmail": "csclub@unt.edu"
    },
    "events": [
      {
        "id": "e1",
        "title": "Hackathon 2026",
        "date": "2026-05-01"
      }
    ]
  }
}`,
  },
  {
    method: "POST",
    path: "/api/clubs/[id]/join-request",
    description: "Submit a request to join a club",
    parameters: [
      { name: "id", type: "string", description: "The club ID to join", required: true },
    ],
    body: [
      { name: "userName", type: "string", description: "Full name of the requester", required: true },
      { name: "userEmail", type: "string", description: "Email address (must be @unt.edu)", required: true },
      { name: "message", type: "string", description: "Optional message to club admins", required: false },
    ],
    exampleResponse: `{
  "success": true,
  "data": {
    "id": "jr-123",
    "clubId": "1",
    "status": "pending",
    "createdAt": "2026-04-20T10:30:00Z"
  }
}`,
  },
  {
    method: "GET",
    path: "/api/events",
    description: "Retrieve campus events with optional filtering",
    parameters: [
      { name: "category", type: "string", description: "Filter by event category", required: false },
      { name: "date", type: "string", description: "Filter by date (YYYY-MM-DD)", required: false },
      { name: "clubId", type: "string", description: "Filter events by organizing club", required: false },
    ],
    exampleResponse: `{
  "success": true,
  "data": [
    {
      "id": "e1",
      "title": "Spring Career Fair",
      "description": "Meet top employers...",
      "date": "2026-04-25",
      "time": "10:00 AM - 3:00 PM",
      "location": "Union Ballroom",
      "category": "Career"
    }
  ]
}`,
  },
  {
    method: "GET",
    path: "/api/saved",
    description: "Get user's saved/bookmarked clubs and events",
    parameters: [
      { name: "userId", type: "string", description: "The user ID", required: true },
    ],
    exampleResponse: `{
  "success": true,
  "data": {
    "savedClubs": ["1", "3", "5"],
    "savedEvents": ["e1", "e4"]
  }
}`,
  },
  {
    method: "POST",
    path: "/api/saved",
    description: "Save or unsave a club or event",
    body: [
      { name: "userId", type: "string", description: "The user ID", required: true },
      { name: "itemId", type: "string", description: "Club or event ID to save", required: true },
      { name: "itemType", type: "string", description: "Either 'club' or 'event'", required: true },
      { name: "action", type: "string", description: "Either 'save' or 'unsave'", required: true },
    ],
    exampleResponse: `{
  "success": true,
  "data": {
    "saved": true,
    "itemId": "1",
    "itemType": "club"
  }
}`,
  },
]

const methodColors: Record<string, string> = {
  GET: "bg-emerald-100 text-emerald-800 border-emerald-200",
  POST: "bg-blue-100 text-blue-800 border-blue-200",
  PUT: "bg-amber-100 text-amber-800 border-amber-200",
  DELETE: "bg-red-100 text-red-800 border-red-200",
}

function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left"
      >
        <CardHeader className="flex flex-row items-center gap-4 py-4">
          <Badge className={`${methodColors[endpoint.method]} font-mono text-xs px-2 py-1`}>
            {endpoint.method}
          </Badge>
          <code className="text-sm font-mono text-foreground flex-1">{endpoint.path}</code>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </CardHeader>
      </button>

      {isOpen && (
        <CardContent className="pt-0 pb-6 space-y-4">
          <p className="text-muted-foreground">{endpoint.description}</p>

          {endpoint.parameters && endpoint.parameters.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Parameters</h4>
              <div className="bg-muted rounded-lg p-3 space-y-2">
                {endpoint.parameters.map((param) => (
                  <div key={param.name} className="flex items-start gap-2 text-sm">
                    <code className="font-mono text-primary">{param.name}</code>
                    <span className="text-muted-foreground">({param.type})</span>
                    {param.required && <Badge variant="outline" className="text-xs">Required</Badge>}
                    <span className="text-muted-foreground">- {param.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {endpoint.body && endpoint.body.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Request Body</h4>
              <div className="bg-muted rounded-lg p-3 space-y-2">
                {endpoint.body.map((field) => (
                  <div key={field.name} className="flex items-start gap-2 text-sm">
                    <code className="font-mono text-primary">{field.name}</code>
                    <span className="text-muted-foreground">({field.type})</span>
                    {field.required && <Badge variant="outline" className="text-xs">Required</Badge>}
                    <span className="text-muted-foreground">- {field.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold">Example Response</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(endpoint.exampleResponse)}
                className="h-8 px-2"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <pre className="bg-foreground text-background rounded-lg p-4 overflow-x-auto text-sm">
              <code>{endpoint.exampleResponse}</code>
            </pre>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">API Documentation</h1>
          <p className="text-muted-foreground">
            RESTful API endpoints for the UNT Get Involved platform. All endpoints return JSON responses.
          </p>
        </div>

        <Card className="mb-8 bg-secondary/30">
          <CardHeader>
            <CardTitle className="text-lg">Base URL</CardTitle>
            <CardDescription>All API requests should be made to:</CardDescription>
          </CardHeader>
          <CardContent>
            <code className="bg-foreground text-background px-3 py-2 rounded font-mono text-sm">
              {typeof window !== "undefined" ? window.location.origin : "https://your-domain.vercel.app"}
            </code>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Endpoints</h2>
          {endpoints.map((endpoint, index) => (
            <EndpointCard key={index} endpoint={endpoint} />
          ))}
        </div>

        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Integration Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>- All endpoints support CORS for local development</p>
            <p>- Authentication will be added in Phase 2 (Supabase Auth)</p>
            <p>- Rate limiting: 100 requests per minute per IP</p>
            <p>- Data is currently served from mock data for demo purposes</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
