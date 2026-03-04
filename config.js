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
  // To change a nickname or rival, just edit it here.
  // rival: must match the "name" field of another player exactly.
  // taunt: the trash talk shown on that player's profile page.
  PLAYERS: [
    "Nick Brown",
    "Katelyn Brown",
    "Josh Burchfield",
    "Josh Brown",
    "Corey Jackson",
    "Spencer Hinrichs",
    "Carson Hinrichs"
  ],

  PLAYER_META: {
    "Nick Brown": {
      slug:     "nick-brown",
      initials: "NB",
      title:    "The Architect",
      nickname: "Nick",         // ← change this to whatever nickname you want
      rival:    "Josh Brown",   // ← must match another player's name exactly
      taunt:    "Still waiting on that rematch."  // ← the trash talk line
    },
    "Katelyn Brown": {
      slug:     "katelyn-brown",
      initials: "KB",
      title:    "The Relentless",
      nickname: "Katelyn",
      rival:    "Corey Jackson",
      taunt:    "Hasn't won yet. Hasn't stopped trying."
    },
    "Josh Burchfield": {
      slug:     "josh-burchfield",
      initials: "JBu",
      title:    "The Grinder",
      nickname: "Burchfield",
      rival:    "Carson Hinrichs",
      taunt:    "The prodigy has a lot to prove."
    },
    "Josh Brown": {
      slug:     "josh-brown",
      initials: "JBr",
      title:    "The Quiet Storm",
      nickname: "Josh B",
      rival:    "Nick Brown",
      taunt:    "Silence is a strategy."
    },
    "Corey Jackson": {
      slug:     "corey-jackson",
      initials: "CJ",
      title:    "The Enforcer",
      nickname: "Corey",
      rival:    "Katelyn Brown",
      taunt:    "Enforcement has no mercy."
    },
    "Spencer Hinrichs": {
      slug:     "spencer-hinrichs",
      initials: "SH",
      title:    "The Strategist",
      nickname: "Spencer",
      rival:    "Josh Burchfield",
      taunt:    "Every move is three moves ahead."
    },
    "Carson Hinrichs": {
      slug:     "carson-hinrichs",
      initials: "CH",
      title:    "The Prodigy",
      nickname: "Carson",
      rival:    "Spencer Hinrichs",
      taunt:    "The student is becoming the threat."
    }
  }
};
