// ============================================================
//  PPCU DATA ENGINE
//  Fetches from Google Sheets and computes all stats
// ============================================================

const PPCUData = (() => {

  // ── Fetch all rows from the sheet ──────────────────────────
  async function fetchResults() {
    const { API_KEY, SHEET_ID, SHEET_TAB } = PPCU_CONFIG;

    if (API_KEY === "YOUR_API_KEY_HERE" || SHEET_ID === "YOUR_SHEET_ID_HERE") {
      console.warn("PPCU: Config not set. Using empty data.");
      return [];
    }

    const range = encodeURIComponent(`${SHEET_TAB}!A2:G1000`);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const rows = data.values || [];

      return rows
        .filter(r => r.length >= 7 && r[6])
        .map(r => ({
          date:    r[0]?.trim() || "",
          player1: r[1]?.trim() || "",
          player2: r[2]?.trim() || "",
          game:    r[3]?.trim() || "",
          p1score: r[4]?.trim() || "—",
          p2score: r[5]?.trim() || "—",
          winner:  r[6]?.trim() || ""
        }));
    } catch (err) {
      console.error("PPCU fetch error:", err);
      return [];
    }
  }

  // ── Build standings from results ───────────────────────────
  function buildStandings(results) {
    const players = PPCU_CONFIG.PLAYERS;
    const stats = {};

    players.forEach(p => {
      stats[p] = { name: p, w: 0, l: 0, pts: 0, streak: 0, streakType: null, games: [] };
    });

    // Sort by date ascending for streak calculation
    const sorted = [...results].sort((a, b) => new Date(a.date) - new Date(b.date));

    sorted.forEach(r => {
      const { player1, player2, winner } = r;
      const loser = winner === player1 ? player2 : player1;

      if (stats[winner]) {
        stats[winner].w++;
        stats[winner].pts += 3;
        stats[winner].games.push("W");
      }
      if (stats[loser]) {
        stats[loser].l++;
        stats[loser].games.push("L");
      }
    });

    // Calculate current streak
    Object.values(stats).forEach(p => {
      if (p.games.length === 0) { p.streak = 0; p.streakType = null; return; }
      const last = p.games[p.games.length - 1];
      let count = 0;
      for (let i = p.games.length - 1; i >= 0; i--) {
        if (p.games[i] === last) count++;
        else break;
      }
      p.streak = count;
      p.streakType = last;
    });

    return Object.values(stats).sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      const aWinPct = a.w + a.l === 0 ? 0 : a.w / (a.w + a.l);
      const bWinPct = b.w + b.l === 0 ? 0 : b.w / (b.w + b.l);
      return bWinPct - aWinPct;
    });
  }

  // ── Format win% ────────────────────────────────────────────
  function winPct(w, l) {
    const total = w + l;
    if (total === 0) return "—";
    return (w / total * 100).toFixed(0) + "%";
  }

  // ── Format streak ──────────────────────────────────────────
  function formatStreak(streak, type) {
    if (!type) return "—";
    return `${type}${streak}`;
  }

  // ── Get recent N results ───────────────────────────────────
  function recentResults(results, n = 10) {
    return [...results]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, n);
  }

  // ── Get head-to-head record ────────────────────────────────
  function headToHead(results, p1, p2) {
    const matches = results.filter(r =>
      (r.player1 === p1 && r.player2 === p2) ||
      (r.player1 === p2 && r.player2 === p1)
    );
    const p1wins = matches.filter(r => r.winner === p1).length;
    const p2wins = matches.filter(r => r.winner === p2).length;
    return { matches: matches.length, p1wins, p2wins };
  }

  // ── Get stats for one player ───────────────────────────────
  function playerStats(results, name) {
    const wins = results.filter(r => r.winner === name);
    const losses = results.filter(r =>
      (r.player1 === name || r.player2 === name) && r.winner !== name
    );
    const allGames = results.filter(r => r.player1 === name || r.player2 === name);
    const gameTypes = {};
    allGames.forEach(r => {
      gameTypes[r.game] = (gameTypes[r.game] || 0) + 1;
    });
    return { wins: wins.length, losses: losses.length, total: allGames.length, gameTypes };
  }

  // ── Most played game ───────────────────────────────────────
  function mostPlayedGame(results) {
    const counts = {};
    results.forEach(r => { counts[r.game] = (counts[r.game] || 0) + 1; });
    if (Object.keys(counts).length === 0) return "—";
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  }

  return { fetchResults, buildStandings, winPct, formatStreak, recentResults, headToHead, playerStats, mostPlayedGame };
})();
