// ============================================================
//  PPCU DATA ENGINE v2
//  Handles miniatures (Results tab) + board games (BoardGames tab)
// ============================================================

const PPCUData = (() => {

  // ── Fetch miniatures results ────────────────────────────────
  async function fetchResults() {
    const { API_KEY, SHEET_ID, SHEET_TAB } = PPCU_CONFIG;
    if (API_KEY === "YOUR_API_KEY_HERE" || SHEET_ID === "YOUR_SHEET_ID_HERE") return [];
    const range = encodeURIComponent(`${SHEET_TAB}!A2:G1000`);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return (data.values || [])
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
      console.error("PPCU fetch error (miniatures):", err);
      return [];
    }
  }

  // ── Fetch board game results ────────────────────────────────
  // Columns: Date, Game, P1, P1Place, P2, P2Place, P3, P3Place, P4, P4Place, P5, P5Place, P6, P6Place, P7, P7Place, P8, P8Place
  async function fetchBoardGames() {
    const { API_KEY, SHEET_ID } = PPCU_CONFIG;
    if (API_KEY === "YOUR_API_KEY_HERE" || SHEET_ID === "YOUR_SHEET_ID_HERE") return [];
    const range = encodeURIComponent(`BoardGames!A2:R1000`);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return (data.values || [])
        .filter(r => r.length >= 4 && r[0] && r[1])
        .map(r => {
          const players = [];
          for (let i = 0; i < 8; i++) {
            const name  = r[2 + i*2]?.trim();
            const place = r[3 + i*2]?.trim();
            if (name && place) players.push({ name, place: parseInt(place) || 99 });
          }
          players.sort((a, b) => a.place - b.place);
          return {
            date:   r[0]?.trim() || "",
            game:   r[1]?.trim() || "",
            players,
            winner: players.length > 0 ? players[0].name : ""
          };
        });
    } catch (err) {
      console.error("PPCU fetch error (board games):", err);
      return [];
    }
  }

  // ── Build miniatures standings ──────────────────────────────
  function buildStandings(results) {
    const stats = {};
    PPCU_CONFIG.PLAYERS.forEach(p => {
      stats[p] = { name: p, w: 0, l: 0, pts: 0, streak: 0, streakType: null, games: [] };
    });
    const sorted = [...results].sort((a, b) => new Date(a.date) - new Date(b.date));
    sorted.forEach(r => {
      const loser = r.winner === r.player1 ? r.player2 : r.player1;
      if (stats[r.winner]) { stats[r.winner].w++; stats[r.winner].pts += 3; stats[r.winner].games.push("W"); }
      if (stats[loser])    { stats[loser].l++; stats[loser].games.push("L"); }
    });
    Object.values(stats).forEach(p => {
      if (!p.games.length) return;
      const last = p.games[p.games.length - 1];
      let count = 0;
      for (let i = p.games.length - 1; i >= 0; i--) {
        if (p.games[i] === last) count++; else break;
      }
      p.streak = count; p.streakType = last;
    });
    return Object.values(stats).sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      const aw = a.w + a.l === 0 ? 0 : a.w / (a.w + a.l);
      const bw = b.w + b.l === 0 ? 0 : b.w / (b.w + b.l);
      return bw - aw;
    });
  }

  // ── Build board game standings ──────────────────────────────
  function buildBoardGameStandings(bgResults) {
    const stats = {};
    PPCU_CONFIG.PLAYERS.forEach(p => {
      stats[p] = { name: p, wins: 0, played: 0, podiums: 0 };
    });
    bgResults.forEach(r => {
      r.players.forEach(({ name, place }) => {
        if (!stats[name]) stats[name] = { name, wins: 0, played: 0, podiums: 0 };
        stats[name].played++;
        if (place === 1) stats[name].wins++;
        if (place <= 3)  stats[name].podiums++;
      });
    });
    return Object.values(stats).sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.podiums - a.podiums;
    });
  }

  // ── Player stats (miniatures) ───────────────────────────────
  function playerMiniStats(results, name) {
    const played = results.filter(r => r.player1 === name || r.player2 === name);
    const wins   = played.filter(r => r.winner === name);
    const gameCounts = {};
    played.forEach(r => { gameCounts[r.game] = (gameCounts[r.game] || 0) + 1; });
    return { wins: wins.length, losses: played.length - wins.length, played: played.length, gameCounts };
  }

  // ── Player stats (board games) ──────────────────────────────
  function playerBoardStats(bgResults, name) {
    const played = bgResults.filter(r => r.players.some(p => p.name === name));
    const wins   = played.filter(r => r.winner === name);
    const gameCounts = {};
    played.forEach(r => { gameCounts[r.game] = (gameCounts[r.game] || 0) + 1; });
    return { wins: wins.length, played: played.length, gameCounts };
  }

  // ── Helpers ─────────────────────────────────────────────────
  function winPct(w, total) {
    if (!total) return "—";
    return (w / total * 100).toFixed(0) + "%";
  }

  function formatStreak(streak, type) {
    if (!type) return "—";
    return `${type}${streak}`;
  }

  function recentResults(results, n = 10) {
    return [...results].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, n);
  }

  function mostPlayedGame(gameCounts) {
    const entries = Object.entries(gameCounts || {});
    if (!entries.length) return "—";
    return entries.sort((a, b) => b[1] - a[1])[0][0];
  }

  return {
    fetchResults, fetchBoardGames,
    buildStandings, buildBoardGameStandings,
    playerMiniStats, playerBoardStats,
    winPct, formatStreak, recentResults, mostPlayedGame
  };
})();
