// ============================================================
//  PPCU CONFIG — fill these in after setting up Google Sheets
// ============================================================

const PPCU_CONFIG = {
  // Your Google Sheets API key
  // Get one at: https://console.cloud.google.com/
  API_KEY: "AIzaSyBMOEPFMlODdXWn4rbd4snTznqIJh-jyE4",

  // The ID from your Google Sheet URL
  // e.g. https://docs.google.com/spreadsheets/d/THIS_PART_HERE/edit
  SHEET_ID: "1scmgKWM8p0-CaG3fDayY9LAlAhqQnAoBI5HhvJ42iww",

  // The name of the tab in your Google Sheet (default: Sheet1)
  SHEET_TAB: "Results",

// ── Player roster ─────────────────────────────────────────
  PLAYERS: [
    "Nick Brown",
    "Katelyn Brown",
    "Josh Burchfield",
    "Josh Brown",
    "Corey Jackson",
    "Spencer Hinrichs",
    "Carson Hinrichs"
  ],

  // ── Player metadata ────────────────────────────────────────
  // Edit any field below to update that player's profile card.
  //
  // nickname  → displayed in the hero subtitle on their profile
  // rival     → must match another player's name exactly
  // taunt     → trash talk shown on their profile page
  // bio       → 1-2 sentence flavor text shown at top of card
  // army      → their miniatures army / faction
  // sigGame   → the game they're most associated with
  // excuses   → their signature excuse after a loss (keep it fun)

  PLAYER_META: {
    "Nick Brown": {
      slug:     "nick-brown",
      initials: "NB",
      title:    "The Architect",
      nickname: "Nick",
      rival:    "Josh Brown",
      taunt:    "Still waiting on that rematch.",
      bio:      "Builds lists the way other people write manifestos — with absolute conviction and zero room for feedback. The PPCU would not exist without him, which he mentions casually and often.",
      army:     "To be added",
      sigGame:  "To be added",
      excuses:  "To be added"
    },
    "Katelyn Brown": {
      slug:     "katelyn-brown",
      initials: "KB",
      title:    "The Relentless",
      nickname: "Katelyn",
      rival:    "Corey Jackson",
      taunt:    "Hasn't won yet. Hasn't stopped trying.",
      bio:      "Refuses to accept that any game is over until the final dice hits the table. Has been known to turn an inevitable loss into something that makes everyone deeply uncomfortable.",
      army:     "To be added",
      sigGame:  "To be added",
      excuses:  "To be added"
    },
    "Josh Burchfield": {
      slug:     "josh-burchfield",
      initials: "JBu",
      title:    "The Grinder",
      nickname: "Burchfield",
      rival:    "Carson Hinrichs",
      taunt:    "The prodigy has a lot to prove.",
      bio:      "Doesn't rely on flashy plays or lucky rolls. Just shows up, grinds, and wins through sheer attrition. The most dangerous opponent you'll ever underestimate.",
      army:     "To be added",
      sigGame:  "To be added",
      excuses:  "To be added"
    },
    "Josh Brown": {
      slug:     "josh-brown",
      initials: "JBr",
      title:    "The Quiet Storm",
      nickname: "Josh B",
      rival:    "Nick Brown",
      taunt:    "Silence is a strategy.",
      bio:      "Says very little. Wins frequently. The gap between those two facts is where most opponents meet their end. Never brags — the record does that for him.",
      army:     "To be added",
      sigGame:  "To be added",
      excuses:  "To be added"
    },
    "Corey Jackson": {
      slug:     "corey-jackson",
      initials: "CJ",
      title:    "The Enforcer",
      nickname: "Corey",
      rival:    "Katelyn Brown",
      taunt:    "Enforcement has no mercy.",
      bio:      "Plays with an intensity that makes casual games feel like tribunal hearings. Every move is deliberate. Every loss is studied. Every win is inevitable in retrospect.",
      army:     "To be added",
      sigGame:  "To be added",
      excuses:  "To be added"
    },
    "Spencer Hinrichs": {
      slug:     "spencer-hinrichs",
      initials: "SH",
      title:    "The Strategist",
      nickname: "Spencer",
      rival:    "Josh Burchfield",
      taunt:    "Every move is three moves ahead.",
      bio:      "Has a plan before the game starts, a backup plan when it falls apart, and a third plan nobody saw coming. Loses gracefully. Wins methodically. Equally dangerous either way.",
      army:     "To be added",
      sigGame:  "To be added",
      excuses:  "To be added"
    },
    "Carson Hinrichs": {
      slug:     "carson-hinrichs",
      initials: "CH",
      title:    "The Prodigy",
      nickname: "Carson",
      rival:    "Spencer Hinrichs",
      taunt:    "The student is becoming the threat.",
      bio:      "Youngest in the room. Routinely the most dangerous. Still figuring out the meta — which is exactly what makes him unpredictable. The rest of the PPCU is not ready.",
      army:     "To be added",
      sigGame:  "To be added",
      excuses:  "To be added"
    }
  }
};

