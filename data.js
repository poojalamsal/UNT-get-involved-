// =============================================
// UNT Get Involved — Shared Data & Utilities
// =============================================

const CLUBS = [
  { id: 1, name: "ACM Programming Club", category: "Technology", description: "Competitive programming, hackathons, and coding workshops for all skill levels.", meeting: "Tuesdays 6pm", location: "Discovery Park A155", email: "acm@unt.edu", members: 142, tags: ["coding", "technology", "hackathon"] },
  { id: 2, name: "UNT Art Club", category: "Arts", description: "Explore painting, drawing, digital art, and mixed media in a welcoming community.", meeting: "Wednesdays 5pm", location: "Art Building 120", email: "artclub@unt.edu", members: 89, tags: ["art", "painting", "creative"] },
  { id: 3, name: "Mean Green Volunteers", category: "Community Service", description: "Organize community service events throughout Denton and North Texas.", meeting: "Mondays 7pm", location: "Union 339", email: "volunteers@unt.edu", members: 210, tags: ["volunteer", "community", "service"] },
  { id: 4, name: "Eagle Fit Club", category: "Sports & Fitness", description: "Workout together, share fitness goals, and motivate each other to stay healthy.", meeting: "Mon/Wed/Fri 7am", location: "Pohl Rec Center", email: "eaglefit@unt.edu", members: 176, tags: ["gym", "fitness", "health"] },
  { id: 5, name: "UNT Music Collective", category: "Music", description: "Jazz, classical, and indie musicians collaborating, performing, and recording.", meeting: "Thursdays 6:30pm", location: "Music Building 250", email: "musiccollective@unt.edu", members: 95, tags: ["music", "performance", "jazz"] },
  { id: 6, name: "Data Science Society", category: "Technology", description: "Machine learning projects, Kaggle competitions, and industry speaker events.", meeting: "Fridays 5pm", location: "Discovery Park B130", email: "datasci@unt.edu", members: 118, tags: ["data", "machine learning", "technology"] },
  { id: 7, name: "Pre-Law Society", category: "Academic", description: "LSAT prep, mock trials, and networking with legal professionals.", meeting: "Tuesdays 7pm", location: "Sage Hall 114", email: "prelaw@unt.edu", members: 67, tags: ["law", "academic", "pre-law"] },
  { id: 8, name: "UNT Photography Club", category: "Arts", description: "Film and digital photography workshops, photo walks around Denton.", meeting: "Saturdays 10am", location: "Union Patio (outdoor)", email: "photo@unt.edu", members: 54, tags: ["photography", "art", "creative"] },
  { id: 9, name: "Environmental Eagles", category: "Community Service", description: "Campus sustainability initiatives, recycling drives, and eco-awareness events.", meeting: "Wednesdays 6pm", location: "Environmental Science 101", email: "enviro@unt.edu", members: 73, tags: ["environment", "sustainability", "volunteer"] },
  { id: 10, name: "Game Developers Guild", category: "Technology", description: "Build games with Unity and Unreal Engine, host game jams every semester.", meeting: "Thursdays 7pm", location: "Discovery Park A240", email: "gamedeva@unt.edu", members: 88, tags: ["gaming", "technology", "coding"] },
  { id: 11, name: "UNT Dance Company", category: "Arts", description: "Contemporary, hip-hop, and ballroom dance. Open auditions each semester.", meeting: "Tue/Thu 7pm", location: "Union Ballroom", email: "dance@unt.edu", members: 61, tags: ["dance", "art", "performance"] },
  { id: 12, name: "Entrepreneurship Club", category: "Business", description: "Pitch competitions, startup workshops, and connections to Denton's business community.", meeting: "Mondays 6:30pm", location: "Business Leadership 180", email: "entre@unt.edu", members: 134, tags: ["business", "startup", "entrepreneurship"] },
  { id: 13, name: "Astronomy Club", category: "Academic", description: "Stargazing nights, telescope use, and space exploration discussions.", meeting: "Fridays 8pm", location: "Science Discovery Village", email: "astro@unt.edu", members: 42, tags: ["astronomy", "science", "academic"] },
  { id: 14, name: "International Students Assoc.", category: "Culture", description: "Celebrating global cultures through food festivals, language exchanges, and socials.", meeting: "Wednesdays 7pm", location: "Union 380", email: "isa@unt.edu", members: 198, tags: ["culture", "international", "community"] },
  { id: 15, name: "UNT Chess Club", category: "Academic", description: "Weekly matches, tournament prep, and casual chess for all skill levels.", meeting: "Sundays 2pm", location: "Willis Library Study Room 3", email: "chess@unt.edu", members: 35, tags: ["chess", "strategy", "academic"] },
  { id: 16, name: "Pre-Med Society", category: "Academic", description: "MCAT prep, hospital shadowing, and networking with healthcare professionals.", meeting: "Thursdays 6pm", location: "Life Sciences 100", email: "premed@unt.edu", members: 156, tags: ["medicine", "health", "academic"] },
];

const EVENTS = [
  { id: 1, clubId: 1, title: "Spring Hackathon Kickoff", date: "2026-04-22", time: "10:00 AM", location: "Discovery Park Atrium", description: "24-hour hackathon open to all students. Form teams and build something amazing!" },
  { id: 2, clubId: 3, title: "Denton Food Bank Drive", date: "2026-04-23", time: "9:00 AM", location: "Union Lobby", description: "Volunteer at the Denton Community Food Bank. Transportation provided." },
  { id: 3, clubId: 5, title: "Jazz Night Live", date: "2026-04-25", time: "7:00 PM", location: "Lyceum at Apogee", description: "End-of-semester jazz showcase featuring student and faculty performers." },
  { id: 4, clubId: 2, title: "Spring Art Show", date: "2026-04-26", time: "2:00 PM", location: "Art Building Gallery", description: "Annual spring exhibition featuring student artwork across all mediums." },
  { id: 5, clubId: 12, title: "Pitch Competition Finals", date: "2026-04-28", time: "5:00 PM", location: "Business Leadership 180", description: "Top 5 student startups pitch to a panel of local investors and entrepreneurs." },
  { id: 6, clubId: 4, title: "5K Fun Run", date: "2026-04-30", time: "8:00 AM", location: "Pohl Rec Center (outdoor track)", description: "A casual 5K around campus. All paces welcome. Free t-shirt for registrants!" },
  { id: 7, clubId: 6, title: "Intro to Machine Learning Workshop", date: "2026-05-02", time: "3:00 PM", location: "Discovery Park B130", description: "Hands-on Python ML workshop. Laptops required. Beginners welcome." },
  { id: 8, clubId: 14, title: "Global Food Festival", date: "2026-05-03", time: "11:00 AM", location: "Union Patio", description: "Sample dishes from 20+ countries prepared by international students." },
  { id: 9, clubId: 10, title: "Spring Game Jam", date: "2026-05-05", time: "12:00 PM", location: "Discovery Park A240", description: "48-hour game jam. Theme revealed at noon. All engines welcome." },
  { id: 10, clubId: 9, title: "Campus Cleanup Day", date: "2026-05-07", time: "9:00 AM", location: "Meet at Library Mall", description: "Help keep our campus beautiful! Gloves and bags provided." },
  { id: 11, clubId: 13, title: "Meteor Shower Viewing Night", date: "2026-05-10", time: "9:00 PM", location: "North of Apogee Stadium (grass field)", description: "Annual Eta Aquariid meteor shower viewing. Telescopes available." },
  { id: 12, clubId: 16, title: "Pre-Med Career Panel", date: "2026-05-12", time: "6:00 PM", location: "Life Sciences 100", description: "Physicians, nurses, and researchers share paths into healthcare careers." },
];

const CATEGORIES = ["All", "Technology", "Arts", "Music", "Community Service", "Sports & Fitness", "Academic", "Business", "Culture"];

// ---- Auth helpers (localStorage-based simulation) ----
const Auth = {
  login(email, password) {
    if (!email.endsWith("@unt.edu") && !email.endsWith("@my.unt.edu")) return { ok: false, error: "Please use your UNT email address." };
    if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
    const user = { email, name: email.split("@")[0].replace(/[._]/g, " ") };
    localStorage.setItem("unt_user", JSON.stringify(user));
    return { ok: true, user };
  },
  logout() { localStorage.removeItem("unt_user"); },
  getUser() { try { return JSON.parse(localStorage.getItem("unt_user")); } catch { return null; } },
  isLoggedIn() { return !!Auth.getUser(); }
};

// ---- Saved clubs helpers ----
const Saved = {
  getAll() { try { return JSON.parse(localStorage.getItem("unt_saved")) || []; } catch { return []; } },
  toggle(clubId) {
    let saved = Saved.getAll();
    if (saved.includes(clubId)) { saved = saved.filter(id => id !== clubId); }
    else { saved.push(clubId); }
    localStorage.setItem("unt_saved", JSON.stringify(saved));
    return saved.includes(clubId);
  },
  isSaved(clubId) { return Saved.getAll().includes(clubId); }
};

// ---- Shared nav injector ----
function renderNav(activePage) {
  const user = Auth.getUser();
  return `
  <nav class="nav">
    <div class="nav-inner">
      <a href="../index.html" class="nav-logo">
        <span class="logo-icon">🦅</span>
        <span>UNT Get Involved</span>
      </a>
      <div class="nav-links">
        <a href="../pages/explore.html" class="${activePage==='explore'?'active':''}">Explore</a>
        <a href="../pages/calendar.html" class="${activePage==='calendar'?'active':''}">Calendar</a>
        ${user
          ? `<a href="../pages/profile.html" class="${activePage==='profile'?'active':''}">My Clubs</a>
             <button class="btn-logout" onclick="Auth.logout();window.location.href='../index.html'">Logout</button>`
          : `<a href="../pages/loginsignup.html" class="btn-signin ${activePage==='auth'?'active':''}">Sign In</a>`
        }
      </div>
      <button class="nav-hamburger" onclick="document.querySelector('.nav-links').classList.toggle('open')">☰</button>
    </div>
  </nav>`;
}
