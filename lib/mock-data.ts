// Mock data for CampusClubs application
// Author: Ifunaya

import type { Club } from "./types"

export const mockClubs: Club[] = [
  {
    id: "1",
    name: "Computer Science Society",
    description: "A community for students passionate about coding, algorithms, and technology innovation.",
    longDescription: "The Computer Science Society is the premier organization for technology enthusiasts at our university. We host weekly coding sessions, hackathons, tech talks from industry professionals, and provide mentorship opportunities for students at all skill levels. Whether you're a seasoned developer or just starting your coding journey, CS Society welcomes you to learn, grow, and connect with like-minded peers.",
    category: "Technology",
    memberCount: 156,
    meetingSchedule: "Every Wednesday, 6:00 PM - 8:00 PM",
    location: "Engineering Building, Room 302",
    email: "cssociety@university.edu",
    website: "https://cssociety.university.edu",
    socialMedia: {
      instagram: "@css_university",
      twitter: "@CSSociety_Uni",
      discord: "discord.gg/cssociety"
    },
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=200&fit=crop",
    tags: ["Programming", "Hackathons", "Networking", "Career Development"],
    isRecruiting: true,
    events: [
      {
        id: "e1",
        title: "Spring Hackathon 2025",
        date: "March 15, 2025",
        time: "9:00 AM - 9:00 PM",
        location: "Student Center Ballroom",
        description: "24-hour hackathon with prizes from top tech companies. Form teams and build innovative solutions!"
      },
      {
        id: "e2",
        title: "Tech Talk: AI in Healthcare",
        date: "February 28, 2025",
        time: "7:00 PM - 8:30 PM",
        location: "Engineering Building, Room 302",
        description: "Guest speaker from Google Health discussing the future of AI in medical applications."
      },
      {
        id: "e3",
        title: "Resume Workshop",
        date: "March 5, 2025",
        time: "5:00 PM - 6:30 PM",
        location: "Career Center",
        description: "Get your resume reviewed by industry professionals and learn tips for landing tech internships."
      }
    ],
    officers: [
      { id: "m1", name: "Sarah Chen", role: "President", year: "Senior", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
      { id: "m2", name: "Marcus Johnson", role: "Vice President", year: "Junior", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { id: "m3", name: "Emily Rodriguez", role: "Treasurer", year: "Junior", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
      { id: "m4", name: "David Kim", role: "Events Coordinator", year: "Sophomore", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    requirements: [
      "Must be a currently enrolled student",
      "Attend at least 2 meetings per month",
      "Participate in one club event per semester"
    ],
    dues: "$20 per semester"
  },
  {
    id: "2",
    name: "Photography Club",
    description: "Capturing moments and developing artistic vision through the lens.",
    longDescription: "The Photography Club is dedicated to exploring the art of visual storytelling. We provide access to professional equipment, organize photo walks across campus and the city, host workshops on editing techniques, and showcase student work in our annual exhibition. Join us to develop your eye for composition and connect with fellow photography enthusiasts.",
    category: "Arts & Culture",
    memberCount: 89,
    meetingSchedule: "Every Friday, 4:00 PM - 6:00 PM",
    location: "Arts Building, Studio 105",
    email: "photoclub@university.edu",
    socialMedia: {
      instagram: "@uni_photoclub"
    },
    coverImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=200&fit=crop",
    tags: ["Photography", "Art", "Creative", "Digital Media"],
    isRecruiting: true,
    events: [
      {
        id: "e4",
        title: "Golden Hour Photo Walk",
        date: "March 10, 2025",
        time: "5:30 PM - 7:30 PM",
        location: "Meet at Main Quad",
        description: "Capture stunning sunset photos around campus. All skill levels welcome!"
      }
    ],
    officers: [
      { id: "m5", name: "Alex Thompson", role: "President", year: "Senior", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
      { id: "m6", name: "Jessica Lee", role: "Vice President", year: "Junior", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    requirements: [
      "Passion for photography (camera optional - phone photography welcome!)"
    ],
    dues: "$15 per semester"
  },
  {
    id: "3",
    name: "Debate Society",
    description: "Sharpening minds and voices through competitive and recreational debate.",
    longDescription: "The Debate Society provides a platform for students to develop critical thinking, public speaking, and argumentation skills. We compete in regional and national tournaments, host campus-wide debates on current issues, and welcome members of all experience levels. Our supportive community will help you find your voice and make compelling arguments.",
    category: "Academic",
    memberCount: 67,
    meetingSchedule: "Tuesdays & Thursdays, 7:00 PM - 9:00 PM",
    location: "Humanities Building, Room 210",
    email: "debate@university.edu",
    website: "https://debate.university.edu",
    socialMedia: {
      twitter: "@UniDebate",
      instagram: "@uni_debate"
    },
    coverImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=200&h=200&fit=crop",
    tags: ["Debate", "Public Speaking", "Critical Thinking", "Competition"],
    isRecruiting: true,
    events: [
      {
        id: "e5",
        title: "Campus Debate: Climate Policy",
        date: "March 20, 2025",
        time: "7:00 PM - 9:00 PM",
        location: "Student Center Auditorium",
        description: "Open debate on climate change policies. Audience participation encouraged!"
      }
    ],
    officers: [
      { id: "m7", name: "Michael Brown", role: "President", year: "Senior", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
      { id: "m8", name: "Priya Patel", role: "Tournament Director", year: "Junior", avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop" }
    ],
    requirements: [
      "Commitment to practicing twice weekly",
      "Willingness to compete in at least one tournament per semester"
    ],
    dues: "$25 per semester (covers tournament fees)"
  }
]

export function getClubById(id: string): Club | undefined {
  return mockClubs.find(club => club.id === id)
}

export function getClubsByCategory(category: string): Club[] {
  return mockClubs.filter(club => club.category === category)
}
